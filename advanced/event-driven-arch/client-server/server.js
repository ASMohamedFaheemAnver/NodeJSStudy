const EventEmitter = require("events");


class Server extends EventEmitter {
  constructor(client) {
    super();

    process.nextTick(() => {
      this.emit("response", "Type a command (help to list commands) ...");
    });

    client.on("command", (command, args) => {
      // console.log({ request: command });
      switch (command) {
        case "help":
        case "add":
        case "ls":
        case "delete":
          this[command](args);
          break;
        default:
          this.emit("response", "unknown");
      }
    });
  }

  help() {
    this.emit("response", "Available commands: add, task, ls, delete:id.");
  }
  add(args) {
    this.emit("response", args.join(" "));
  }
  ls() {
    this.emit("response", "ls");
  }
  delete() {
    this.emit("response", "delete");
  }

}

module.exports = (client) => new Server(client);