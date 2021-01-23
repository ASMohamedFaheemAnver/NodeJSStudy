const { exec } = require("child_process");

exec("find . -type f | wc -l", (err, stdout, stderr) => {
  if (err) {
    console.log(`exec error : ${err}`);
    return;
  }

  console.log(`number of files ${stdout}`);
});
