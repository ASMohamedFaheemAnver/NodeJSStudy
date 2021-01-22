const fs = require("fs");
const path = require("path");

const dirname = path.join(__dirname, "files");
const currentFiles = fs.readdirSync(dirname);

console.log(currentFiles);

fs.watch(dirname, (eventType, filename) => {
  if (eventType == "rename") {
    const index = currentFiles.indexOf(filename);
    if (index >= 0) {
      currentFiles.splice(index, 1);
      console.log(currentFiles);
      return;
    }

    currentFiles.push(filename);
    console.log(currentFiles);
    return;
  }
});
