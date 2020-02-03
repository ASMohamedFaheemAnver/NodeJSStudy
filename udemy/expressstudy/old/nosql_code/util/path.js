const path = require('path');
// console.log(process.mainModule.filename);
// This file returning the app.js file path
module.exports = path.dirname(process.mainModule.filename);