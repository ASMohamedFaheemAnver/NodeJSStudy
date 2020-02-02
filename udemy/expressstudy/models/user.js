const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findByPk(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: mongoDb.ObjectId(userId) })
      .then(user => {
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;