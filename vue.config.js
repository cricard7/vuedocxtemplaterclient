//https://docxtemplater.readthedocs.io/en/latest/generate.html
//Section on Node
var PizZip = require("pizzip");
var Docxtemplater = require("docxtemplater");
const fs = require("fs");

//Load the docx file as a binary string
var content = fs.readFileSync("./src/tag-example.docx", "binary");

//May be vue cli specific. Unable to pass content (which is a binary string) through webpack directly due to errors in the browser
//Appending to object works for vue CLI

var myobj = {
 "value": content
}

var myobjstr = JSON.stringify(myobj)


const webpack = require("webpack"); //Need to add this to default config
// Using FS in vue at compile time
// https://stackoverflow.com/questions/52420663/unable-to-require-fs-with-vue-cli-3/53502487

module.exports = {
  configureWebpack: (config) => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          myFileVar: myobjstr
        }),
      ],
    };
  },
};
