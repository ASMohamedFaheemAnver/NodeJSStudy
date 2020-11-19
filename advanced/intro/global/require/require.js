const fs = require("fs");

/* Require module resolves files according to the paths 
  order in module module, If we check the paths.json you will find it */

// fs.writeFile("paths.json", JSON.stringify(module), "utf8", (err) => {
//   if (err) {
//     console.log(err);
//   }
// });


console.log("In .");
console.log(module);

/* require will load closes .js file from the paths and once it fines it, 
  It won't go for other paths */
require("find-me");
// require.resolve("find-me");

// package.json file in the nice folder will tell don't load index.js
// load start.js according to our configuration
const niceExports = require("nice");
console.log({ niceExports: niceExports });
