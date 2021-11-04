const Sequelize = require("sequelize");

// can create using single connection string also
const sequelize = new Sequelize("carddb", "root", "", {
  dialect: "mysql",
});
global.sequelize = sequelize;

const User = require("./models/User");
const Post = require("./models/Post");

User.belongsTo(Post, {
  foreignKey: {
    name: "userId",
  },
  as: "post",
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
    force: true,
  })
  .then(async (_) => {
    console.log({ msg: "connected" });
    playBoy();
  })
  .catch((err) => {
    console.log({ err });
  });

const playBoy = async () => {
  const user = await User.create({
    name: "codersauthority",
  });
  const post = await Post.create({
    title: "Post of mine!",
    userId: user.uuid,
  });

  const users = await User.findAll({ include: { model: Post, as: "post" } });
  console.log({ user: users[0].post });
};
