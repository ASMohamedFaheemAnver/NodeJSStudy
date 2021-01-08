const PDFDocument = require("pdfkit");
const fs = require("fs");

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream("font.pdf"));

// Set the font size
doc.fontSize(18);

// Using a standard PDF font
doc.font("Times-Roman").text("Hello from Times Roman!").moveDown(0.5);

// Using a TrueType font (.ttf)
// doc.font("fonts/GoodDog.ttf").text("This is Good Dog!").moveDown(0.5);

// Using a collection font (.ttc or .dfont)
// doc.font("fonts/Chalkboard.ttc", "Chalkboard-Bold").text("This is Chalkboard, not Comic Sans.");

/*
 *Another nice feature of the PDFKit font support, is the ability to register a font file under a name
 *for use later rather than entering the path to the font every time you want to use it.
 */

// Register a font
// doc.registerFont("Heading Font", "fonts/Chalkboard.ttc", "Chalkboard-Bold");

// Use the font later
// doc.font("Heading Font").text("This is a heading.");

doc.end();
