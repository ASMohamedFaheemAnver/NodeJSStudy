const Sequelize = require("sequelize");

// can create using single connection string also
const sequelize = new Sequelize("carddb", "root", "", {
  dialect: "mysql",
});

const User = sequelize.define("User", {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: Sequelize.STRING,
  bio: Sequelize.TEXT,
});

const closeDBConnection = () => {
  sequelize.close();
};

// process.on("SIGINT", closeDBConnection);
[
  `exit`,
  `SIGINT`,
  `SIGUSR1`,
  `SIGUSR2`,
  `uncaughtException`,
  `SIGTERM`,
].forEach((eventType) => {
  process.on(eventType, () => {
    console.log({ msg: "cleaning up", eventType });
    closeDBConnection();
  });
});

sequelize
  .sync({
    logging: console.log,
    // force: true
  })
  .then(async (_) => {
    console.log({ msg: "connected" });
    const users = await User.findAll();
    console.log({ users });
  })
  .catch((err) => {
    console.log({ err });
  });
