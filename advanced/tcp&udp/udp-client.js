const dgram = require("dgram");

const client = dgram.createSocket("udp4");

const PORT = 3333;
const HOST = "127.0.0.1";

const message = Buffer.from("Pluralsight rocks.");

client.send(message, 0, message.length, PORT, HOST, (err) => {
  if (err) {
    throw err;
  }

  console.log("UDP message sent.");
  client.close();
});