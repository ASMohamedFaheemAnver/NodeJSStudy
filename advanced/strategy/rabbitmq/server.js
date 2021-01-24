const express = require("express");

const queueOne = require("./queues/queue.one");
const queueTwo = require("./queues/queue.two");

const app = express();

app.get("/", (req, res) => {
  let number = req.query.number;

  if (number % 2) {
    queueOne(number);
  } else {
    queueTwo(number);
  }

  res.json({ msg: "emitted" });
});

app.listen(3000, () => {
  console.log(`express app is running`);
});
