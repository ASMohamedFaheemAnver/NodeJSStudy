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

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(p => {
      return p.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        return products.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() == p._id.toString();
            }).quantity
          };
        });
      });
  }

  deleteItemFromCart(prodId) {
    const db = getDb();
    const updatedProductItems = [...this.cart.items].filter(p => {
      return p.productId.toString() !== prodId.toString();
    });
    const updatedCart = { items: updatedProductItems };

    return db
      .collection("users")
      .updateOne(
        { _id: new mongoDb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      )
      .then()
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

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then(products => {
        const order = {
          items: products,
          user: {
            _id: new mongoDb.ObjectId(this._id),
            username: this.username
          }
        };
        return db.collection("orders").insertOne(order);
      })
      .then(_ => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new mongoDb.ObjectId(this._id) },
            { $set: { cart: this.cart } }
          );
      });
  }

  getOrders() {
    const db = getDb();
    // return db.collection("orders").
  }
}

module.exports = User;
