const cluster = require("cluster");
const os = require("os");

const numberOfUsersInDB = function () {
  this.count = this.count || 5;
  this.count = this.count * this.count;
  return this.count;
};

if (cluster.isMaster) {
  console.log(`master pid : ${process.pid}`);

  const cpus = os.cpus().length;
  console.log(`forking for ${cpus} cups`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  // handling server crash
  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`worker ${worker.id} crashed.`);
      cluster.fork();
    }
  });

  const updateWorkers = () => {
    const usersCount = numberOfUsersInDB();
    Object.values(cluster.workers).forEach((worker) => {
      worker.send({ usersCount });
    });
  };

  process.on("SIGUSR2", () => {
    const workers = Object.values(cluster.workers);
    const restartWorker = (workerIndex) => {
      const worker = workers[workerIndex];
      if (!worker) return;

      worker.on("exit", () => {
        if (!worker.exitedAfterDisconnect) return;
        console.log(`exited process : ${worker.process.pid}`);
        cluster.fork().on("listening", () => {
          restartWorker(workerIndex + 1);
        });
      });

      worker.disconnect();
    };

    restartWorker(0);
  });

  setInterval(updateWorkers, 10000);
} else {
  require("./server");
}
