const fs = require("fs");

function fileSize(fileName, cb) {
  if (typeof fileName !== "string") {
    return process.nextTick(cb, new TypeError("Argument should be string."));
  }

  fs.stat(fileName, (err, state) => {
    if (err) {
      return cb(err);
    }

    cb(null, state.size);
  });
}

fileSize(__filename, (err, size) => {
  if (err) throw err;
  console.log("Size in KB : " + size / 1024);
});


console.log({ msg: "Is it dode." });