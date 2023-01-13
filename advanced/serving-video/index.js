const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/index.html");
});

app.get("/video", (req, res) => {
  const range = req.headers.range;
  if (!range) {
    return res.status(400).send({ msg: "Need range" });
  }
  const path = "buck.mp4";
  const size = fs.statSync("buck.mp4").size;

  const CHUNK_SIZE = 10 ** 5;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, size - 1);
  const length = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${size}`,
    "Accept-Ranges": "bytes",
    "Content-Length": length,
    "Content-Type": "video/mp4",
  };
  // 206 means partial content
  res.writeHead(206, headers);
  const fileStream = fs.createReadStream(path, { start, end });
  return fileStream.pipe(res);
});

app.listen(8000, () => {
  console.log({ msg: "Listening on port 8000" });
});
