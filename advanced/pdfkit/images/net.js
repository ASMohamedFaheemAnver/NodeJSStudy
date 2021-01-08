const request = require("request");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream("net.pdf"));

request(
  {
    url:
      "https://avatars1.githubusercontent.com/u/48675598?s=460&u=e67c54a9f0131d7944115bff970bb773d338324f&v=4",
    encoding: null,
  },
  (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var img = new Buffer.from(body, "base64");
      doc.image(img, 0, 0);

      doc.end();
    }
  }
);
