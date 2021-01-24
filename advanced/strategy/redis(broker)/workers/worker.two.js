const redis = require("redis");

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

client.subscribe("worker.two");

client.on("message", (channel, message) => {
  console.log(`worker two recieved a message : ${message}`);
});
