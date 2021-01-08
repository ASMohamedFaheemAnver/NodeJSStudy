const PDFDocument = require("pdfkit");
const fs = require("fs");

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream("basics.pdf"));

// Scale proprotionally to the specified width
doc.image("img.jpg", 0, 15, { width: 300 }).text("Proportional to width", 0, 0);

// Fit the image within the dimensions
doc
  .image("img.jpg", 320, 15, { fit: [100, 100] })
  .rect(320, 15, 100, 100)
  .stroke()
  .text("Fit", 320, 0);

// Stretch the image
doc.image("img.jpg", 320, 145, { width: 200, height: 100 }).text("Stretch", 320, 130);

// Scale the image
doc.image("img.jpg", 320, 280, { scale: 0.25 }).text("Scale", 320, 265);

// Fit the image in the dimensions, and center it both horizontally and vertically
doc
  .image("img.jpg", 430, 15, { fit: [100, 100], align: "center", valign: "center" })
  .rect(430, 15, 100, 100)
  .stroke()
  .text("Centered", 430, 0);

doc.end();
