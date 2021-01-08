const PDFDocument = require("pdfkit");
const fs = require("fs");
const { title } = require("process");

const doc = new PDFDocument();

doc.info.Title = "meta example";
doc.info.Author = "freedom";
doc.info.Subject = "example";
doc.info.Keywords = "nodejs";
doc.info.CreationDate = new Date();
doc.info.ModDate = new Date();

doc.pipe(fs.createWriteStream("meta.pdf"));

doc.end();
