const Sequelize = require("sequelize");
const User = require("./User");

const Post = sequelize.define("Post", {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: User,
      key: "uuid",
    },
  },
  title: Sequelize.STRING,
});

module.exports = Post;
