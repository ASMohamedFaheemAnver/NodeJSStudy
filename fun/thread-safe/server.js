const express = require("express");
const cluster = require("cluster");
const os = require("os");
const mongoose = require("mongoose");

const Count = require("./model/count");

const nCpus = os.cpus().length;

if (cluster.isMaster) {
  console.log(`total number of cpus is : ${nCpus}.`);
  for (let i = 0; i < nCpus; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log(
      `worker with id : ${worker.id} and pid : ${worker.process.pid} is online.`
    );
  });

  cluster.on("exit", (worker) => {
    console.log(
      `worker with id : ${worker.id} and pid : ${worker.process.pid} is offline.`
    );

    console.log(`let's fork another worker!`);
    cluster.fork();
  });
} else {
  const app = express();

  const pid = process.pid;

  const closeDBConnection = () => {
    console.log(`closing db connection with pid : ${process.pid}`);
    mongoose.connection.close();
    process.exit();
  };

  process.on("SIGINT", closeDBConnection);

  app.get("/create", async (req, res) => {
    const count = new Count();
    await count.save();
    res.json({ msg: "200 OK!", doc: count });
  });

  app.get("/get", async (req, res) => {
    const count = await Count.findById(req.query._id);
    res.json({ msg: "200 OK!", doc: count });
  });

  app.get("/concurrency", (req, res) => {
    Count.findOneAndUpdate({ _id: req.query._id }, { $inc: { count: 1 } })
      .then((data) => {})
      .catch((err) => {});
    res.json({ msg: "200 OK!" });
  });

  app.get("/noob", (req, res) => {
    Count.findById(req.query._id).then((doc, err) => {
      if (err) {
        return;
      }
      doc.count++;
      doc.save();
    });
    res.json({ msg: "200 OK!" });
  });

  mongoose
    .connect(process.env.mongodb_url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((_) => {
      app.listen(3000, () => {
        console.log(`server running with pid : ${pid}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
