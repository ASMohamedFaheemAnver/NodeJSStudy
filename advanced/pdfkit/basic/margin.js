const PDFDocument = require("pdfkit");
const fs = require("fs");

// Passing a page options object to the PDFDocument constructor will set the default paper size
// and layout for every page in the document, which is then overridden by individual options passed to the addPage method.
// const doc = new PDFDocument({ margin: 100 });

// You can set the page margins in two ways. The first is by setting the margin property (singular) to a number, which applies that margin to all edges. The other way is to set the margins property (plural) to an object with top, bottom, left, and right values. The default is a 1 inch (72 point) margin on all sides.
const doc = new PDFDocument({
  margins: {
    top: 50,
    bottom: 50,
    left: 72,
    right: 72,
  },
});

doc.pipe(fs.createWriteStream("basics.pdf"));

doc.text("hello world!");

// Adding different margins on each side
doc.addPage({
  margins: {
    top: 50,
    bottom: 50,
    left: 72,
    right: 72,
  },
});

doc.end();
