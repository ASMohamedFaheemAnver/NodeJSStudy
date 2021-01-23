const http = require("http");
const pid = process.pid;

let usersCount = 0;

http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++);
    res.write(`handling by processor : ${pid}\n`);
    res.end(`users : ${usersCount}`);
  })
  .listen(8000, () => {
    console.log(`started process : ${pid}`);
  });

process.on("message", (msg) => {
  usersCount = msg.usersCount;
});
