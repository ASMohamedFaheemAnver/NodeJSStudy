const server = require("net").createServer();
let counter = 0;
let sockets = {};

function timestamp() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
}

server.on("connection", socket => {
  console.log("Client connected.");
  socket.id = counter++;
  // socket.write("Welcome new client!\n");
  socket.write("Please type your name : ");

  socket.on("data", data => {
    if (!sockets[socket.id]) {
      socket.name = data.toString().trim();
      sockets[socket.id] = socket;
      socket.write(`Welcome ${socket.name}!\n`);
      return;
    }

    // console.log("data is : ", data);
    Object.entries(sockets).forEach(([key, cs]) => {
      if (socket.id == key) {
        return;
      }
      cs.write(`${socket.name}@${timestamp()} : ${data}`);
    });
  });

  // socket.setEncoding("utf8");
  socket.on("end", () => {
    console.log("Client disconnected.");
    delete sockets[socket.id];
  });
});

server.listen(8000, () => console.log("Server is running."));