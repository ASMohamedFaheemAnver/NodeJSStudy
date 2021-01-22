const server = require("http").createServer();

server.on("request", (req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });

  // will end the response
  // res.end("hello world\n");

  // node sending response as stream
  res.write("start streaming!\n");

  // can also set timeout
  // server.timeout = 1000;

  // will send data chuncks through the stream
  setInterval(function () {
    res.write("data!\n");
  }, 1000);
});

server.listen(8000);
