const { fork } = require("child_process");

const server = require("http").createServer();

server.on("request", (req, res) => {
  if (req.url === "/compute") {
    // limited to number of processors we can fork
    const compute = fork("compute.js");
    compute.send("start");

    compute.on("message", (sum) => {
      res.end(`sum is ${sum}\n`);
    });
  } else {
    res.end("ok brah!\n");
  }
});

server.listen(8000);
