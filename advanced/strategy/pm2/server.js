const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log(`hitting the route with pid : ${process.pid}.`);
  res.json({ msg: "200K OK" });
});

app.listen(3000, () => {
  console.log(`express app is running with pid : ${process.pid}`);
});
