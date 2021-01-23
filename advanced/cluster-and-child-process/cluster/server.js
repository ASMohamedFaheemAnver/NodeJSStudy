const http = require("http");
const pid = process.pid;

http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++);
    res.end(`handling by processor : ${pid}`);
  })
  .listen(8000, () => {
    console.log(`started process : ${pid}`);
  });
