const PDFDocument = require("pdfkit");
const fs = require("fs");

let i;
let end;
const doc = new PDFDocument({
  bufferPages: true,
});

doc.pipe(fs.createWriteStream("switch.pdf"));

doc.addPage();
doc.addPage();

/*
 * PDFKit has a bufferPages option in versions v0.7.0 and later that
 * allows you to control when pages are flushed to the output file yourself rather than letting PDFKit handle that for you.
 * To use it, just pass bufferPages: true as an option to the PDFDocument constructor.
 * Then, you can call doc.switchToPage(pageNumber) to switch to a previous page (page numbers start at 0)
 */

// see the range of buffered pages
const range = doc.bufferedPageRange();

for (i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
  doc.switchToPage(i);
  doc.text(`page ${i + 1} of ${range.count}`);
}

// manually flush pages that have been buffered
doc.flushPages();

// or, if you are at the end of the document anyway,
// doc.end() will call it for you automatically.
doc.end();
