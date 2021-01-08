const PDFDocument = require("pdfkit");
const fs = require("fs");

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream("basics.pdf"));

doc.text("Hello World!");
/*
 * Internally, PDFKit keeps track of the current X and Y position of text as it is added to the document.
 * This way, subsequent calls to the text method will automatically appear as new lines below the previous line. However,
 * you can modify the position of text by passing X and Y coordinates to the text method after the text itself.
 */
doc.text("Hello world!", 100, 100);

doc.end();
