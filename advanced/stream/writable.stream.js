const { Readable } = require("stream");

// pushing all at once
// const inStream = new Readable();
// inStream.push("abcdefghijklmnopqrstuvwxyz");
// inStream.push(null);

// pushing data on demand
const inStream = new Readable({
  read(size) {
    setTimeout(() => {
      this.push(String.fromCharCode(this.currentCharCode++));
      if (this.currentCharCode > 90) {
        this.push(null);
      }
    }, 100);
  },
});

inStream.currentCharCode = 65;

inStream.pipe(process.stdout);
