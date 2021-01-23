const express = require("express");
const cluster = require("cluster");
const os = require("os");

const nCpus = os.cpus().length;

if (cluster.isMaster) {
  console.log(`total number of cpus is : ${nCpus}.`);
  for (let i = 0; i < nCpus; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log(`worker with id : ${worker.id} and pid : ${worker.process.pid} is online.`);
  });

  cluster.on("exit", (worker) => {
    console.log(`worker with id : ${worker.id} and pid : ${worker.process.pid} is offline.`);

    console.log(`let's fork another worker!`);
    cluster.fork();
  });
} else {
  const app = express();

  const pid = process.pid;

  app.get("/", (req, res) => {
    console.log(`req received by pid : ${pid}`);
    res.json({ msg: "200K OK" });
  });

  app.listen(3000, () => {
    console.log(`server running with pid : ${pid}`);
  });
}
