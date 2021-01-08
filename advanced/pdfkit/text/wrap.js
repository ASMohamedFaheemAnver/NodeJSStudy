const PDFDocument = require("pdfkit");
const fs = require("fs");

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream("wrap.pdf"));

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.";

doc.fontSize(8);
doc.text(`This text is left aligned. ${lorem}`, {
  width: 410,
  align: "left",
});

doc.moveDown();
doc.text(`This text is centered. ${lorem}`, {
  width: 410,
  align: "center",
});

doc.moveDown();
doc.text(`This text is right aligned. ${lorem}`, {
  width: 410,
  align: "right",
});

doc.moveDown();
doc.text(`This text is justified. ${lorem}`, {
  width: 410,
  align: "justify",
});

doc.end();
