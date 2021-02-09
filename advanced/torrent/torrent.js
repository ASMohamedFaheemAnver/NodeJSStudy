const torrentStream = require("torrent-stream");
const fs = require("fs");
const path = require("path");

// will accept magnet link or buffer
const engine = torrentStream(fs.readFileSync(path.join(__dirname, "udemy.torrent")));

engine.on("ready", () => {
  engine.files.forEach((file) => {
    const readStream = file.createReadStream();
    const writeStream = fs.createWriteStream(file.name);
    readStream.pipe(writeStream);
  });
});
