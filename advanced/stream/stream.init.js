const fs = require("fs");

const server = require("http").createServer();

server.on("request", (req, res) => {
  // reading the file
  // fs.readFile("./helper/big.txt", (err, data) => {
  //   if (err) throw err;
  //   sending the file as one chunck
  //   res.end(data);
  // });
  const file = fs.createReadStream("./helper/big.txt");
  // res.setHeader(`Content-Disposition`, `attachment; filename=x.txt`);
  // res.setHeader("content-type", "text/plain");
  file.pipe(res);
});

server.listen(8000);
