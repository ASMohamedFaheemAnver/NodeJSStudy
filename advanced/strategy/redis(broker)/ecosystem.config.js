module.exports = {
  apps: [
    {
      name: "express",
      script: "server.js",
      watch: true,
      instances: 2,
      exec_mode: "cluster",
    },
    {
      name: "workerone",
      script: "workers/worker.one.js",
      instances: 1,
      watch: true,
    },
    {
      name: "workertwo",
      script: "workers/worker.two.js",
      instances: 1,
      watch: true,
    },
  ],
};
