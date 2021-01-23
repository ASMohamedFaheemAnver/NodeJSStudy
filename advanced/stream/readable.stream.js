const { Writable } = require("stream");

const outStream = new Writable({
  write(chunck, encording, callback) {
    console.log(chunck.toString());
    callback();
  },
});

process.stdin.pipe(outStream);

// equals to
// streaming the input to output stream
// process.stdin.pipe(process.stdout);
