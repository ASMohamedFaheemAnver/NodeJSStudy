var fs = require('fs');

var readableStream = fs.createReadStream('in.txt');
var writableStream = fs.createWriteStream('out.txt');

readableStream.pipe(writableStream);