const express = require("express");
const redis = require("redis");

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

const app = express();

app.get("/", (req, res) => {
  const number = req.query.number;
  if (number % 2 === 0) {
    client.publish("worker.one", number);
  } else {
    client.publish("worker.two", number);
  }
  res.json({ msg: "ok" });
});

app.listen(3000, () => {
  console.log("server is up and running!");
});
