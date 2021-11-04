const Sequelize = require("sequelize");

const User = sequelize.define("User", {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: Sequelize.STRING,
});

module.exports = User;
