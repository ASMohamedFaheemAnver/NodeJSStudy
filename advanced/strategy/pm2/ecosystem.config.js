module.exports = {
  apps: [
    {
      name: "sff-server",
      script: "./dist/src/main.js",
      watch: true,
      instances: 4,
      exec_mode: "cluster",
    },
  ],
};
