const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const formateMessage = require("./utils/messages");

const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/users");

const botName = "bot";

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// run when client connects
io.on("connection", (socket) => {
  socket.on("join:room", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // send welcome message to the user
    socket.emit("message", formateMessage(botName, "welcome to chat application!"));

    // brodcast when a user connects, will emit event to all clients except the client connecting.
    socket.broadcast
      .to(user.room)
      .emit("message", formateMessage(botName, `${user.username} has joined the chat!`));

    io.to(user.room).emit("roomusers", { room: user.room, users: getRoomUsers(user.room) });
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formateMessage(botName, `${user.username} has left the chat!`)
      );

      io.to(user.room).emit("roomusers", { room: user.room, users: getRoomUsers(user.room) });
    }
  });

  // listen for chat:message
  socket.on("chat:message", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formateMessage(user.username, msg));
  });

  // emit event to all clients
  // io.emit();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
