const server = require("net").createServer();
let counter = 0;
let sockets = {};

server.on("connection", socket => {
  console.log("Client connected.");
  socket.id = counter++;
  sockets[socket.id] = socket;
  socket.write("Welcome new client!\n");

  socket.on("data", data => {
    // console.log("data is : ", data);
    Object.entries(sockets).forEach(([key, cs]) => {
      cs.write(`${socket.id}, data is : ${data}`);
    });
  });

  // socket.setEncoding("utf8");
  socket.on("end", () => {
    console.log("Client disconnected.");
    delete sockets[socket.id];
  });
});

server.listen(8000, () => console.log("Server is running."));