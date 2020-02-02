const mongoDb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, /*id,*/ userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    // this._id = id;
    this.userId = userId;
  }

  save() {
    const db = getDb();

    let dbOp;
    // if (this._id) {
    //   dbOp = db
    //     .collection("products")
    //     .updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: this });
    // } else {
      dbOp = db.collection("products").insertOne(this);
    // }

    return dbOp
      .then(result => {
        return result;
        // console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findByPk(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongoDb.ObjectId(id) })
      .next()
      .then(product => {
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteByPk(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongoDb.ObjectId(id) })
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static updateByPk(id, updatedData) {
    const db = getDb();
    return db
      .collection("products")
      .updateOne({ _id: new mongoDb.ObjectId(id) }, { $set: updatedData })
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;
