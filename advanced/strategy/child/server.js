const express = require("express");
const cluster = require("cluster");
const child = require("child_process");
const os = require("os");

const nCpus = os.cpus().length;

if (cluster.isMaster) {
  console.log(`master process with id : ${process.pid}`);

  // forking same .js file will also create multiple child process
  const childOne = child.fork("./workers/worker.one.js");
  const childTwo = child.fork("./workers/worker.two.js");

  console.log(`child process with id : ${childOne.pid} is created`);
  console.log(`child process with id : ${childTwo.pid} is created`);

  childOne.on("message", function (message) {
    console.log(`worker one sends : ${message} `);
  });

  childTwo.on("message", function (message) {
    console.log(`worker two sends : ${message} `);
  });

  cluster.on("online", (worker) => {
    worker.on("message", (message) => {
      if (message % 2) {
        childOne.send(message);
      } else {
        childTwo.send(message);
      }
    });
  });

  for (let i = 0; i < nCpus; i++) {
    let worker = cluster.fork();
    console.log(`worker started with pid : ${worker.process.pid}`);
  }
} else {
  const app = express();
  app.get("/", (req, res) => {
    process.send(req.query.number);
    console.log(`worker with pid: ${process.pid} received the request`);
    res.json({ msg: "emitted" });
  });

  app.listen(3000, () => {
    console.log(`express app running`);
  });
}
