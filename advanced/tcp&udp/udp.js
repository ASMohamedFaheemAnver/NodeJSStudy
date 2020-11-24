const dgram = require("dgram");

const server = dgram.createSocket("udp4");

server.on("listening", () => {
  console.log("UDP server is listening.");
});

server.on("message", (msg, rinfo) => {
  console.log(`${rinfo.address}:${rinfo.port} - ${msg}`);
});

const PORT = 3333;
const HOST = "127.0.0.1";

server.bind(PORT, HOST);