const PDFDocument = require("pdfkit");
const fs = require("fs");

// PDFDocument is a readable node stream.
// The first page will be automatically added unless you specify autoFirstPage: false.
const doc = new PDFDocument(/*{autoFirstPage: false}*/);

// To add some content every time a page is created, we can listen to pageAdded event.
doc.on("pageAdded", () => doc.text("page title"));

// doc.pipe will send the output to another node writable stream,
doc.pipe(fs.createWriteStream("basics.pdf"));
// below code will send it as a response in http response.
// doc.pipe(res);

// To add subsequent pages should call .addPage().
doc.addPage() /*.text("page title")*/;

doc.end();
