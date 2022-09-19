module.exports = {
  apps: [
    {
      name: "express",
      script: "server.js",
      watch: true,
      instances: 4,
      exec_mode: "cluster",
    },
  ],
};
