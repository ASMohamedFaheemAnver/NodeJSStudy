const { spawn } = require("child_process");

// running pwd command in child process
// const child = spawn("pwd");
const child = spawn("find", [".", "-type", "f"]);

child.on("exit", function (code, signal) {
  console.log(`child process exited with code ${code}, signal ${signal}\n`);
});

// other event on child: disconnect, error, message, close
// stdio objects: child.stdin, child.stdout, child.stderr

child.stdout.on("data", (data) => {
  console.log(`child stdout: ${data}\n`);
});

child.stderr.on("data", (data) => {
  console.log(`child stderr: ${data}\n`);
});
