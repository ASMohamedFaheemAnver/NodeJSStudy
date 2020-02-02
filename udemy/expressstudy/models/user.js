const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
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

  addToCart(product) {
    let updatedCartItems = [];
    let cartProductIndex;
    if (this.cart) {
      cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
      });

      updatedCartItems = [...this.cart.items];
    }

    let newQuantity = 1;
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongoDb.ObjectId(product._id),
        quantity: newQuantity
      });
    }

    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongoDb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      )
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
