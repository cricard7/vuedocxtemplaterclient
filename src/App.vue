<template>
  <div id="app">

      <a href="./tag-example.docx" download>
        tag example
      </a>
      
      <a @click="renderDoc">renderdoc</a>

  </div>
</template>

<script>
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}



export default {
  name: 'App',
  components: {
    
  },
  data: function(){
    return{
      fileTemplate: "",
      testName: "Billium"
    }
  },
  created: function(){
   
    //console.log(myFileVar.value)
    var zip = new PizZip(myFileVar.value);
    var doc = new Docxtemplater(zip);
    //set the templateVariables. This can be dynamically generated but is hardcoded in this example.
doc.setData({
    first_name: this.testName,
    last_name: 'Doe',
    phone: '0652455478',
    description: 'New Website'
});

doc.render()

var out=doc.getZip().generate({
                type:"blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            }) //Output the document using Data-URI
            saveAs(out,"output.docx")

  },
  methods: {
    renderDoc() {
      //from example loadFile("https://docxtemplater.com/tag-example.docx"
    
      //local file
     // var templateFile = import('./tag-example.docx')
      loadFile("https://docxtemplater.com/tag-example.docx", function(
        error,
        content
      ) {
        console.log(content)
        if (error) {
          throw error;
        }
        var zip = new PizZip(content);
        var doc = new Docxtemplater(zip);
        doc.setData({
          first_name: "John",
          last_name: "Doe",
          phone: "0652455478",
          description: "New Website"
        });
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          function replaceErrors(key, value) {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function(
                error,
                key
              ) {
                error[key] = value[key];
                return error;
              },
              {});
            }
            return value;
          }
          console.log(JSON.stringify({ error: error }, replaceErrors));

          if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
              .map(function(error) {
                return error.properties.explanation;
              })
              .join("\n");
            console.log("errorMessages", errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
          }
          throw error;
        }
        var out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }); //Output the document using Data-URI
        saveAs(out, "output.docx");
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
