const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function(product) {
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
      productId: product._id,
      quantity: newQuantity
    });
  }

  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;

  return this.save()
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
    });
};

userSchema.methods.deleteItemFromCart = function(prodId) {
  const updatedProductItems = [...this.cart.items].filter(p => {
    return p.productId.toString() !== prodId.toString();
  });
  this.cart.items = updatedProductItems;
  return this.save()
    .then()
    .catch(err => {
      console.log(err);
    });
};

userSchema.methods.clearCart = function() {
  this.cart.items = [];
  return this.save()
    .then()
    .catch(err => {
      console.log(err);
    });
};

// userSchema.methods.addOrder = function() {
//   return this.populate("cart.items.productId")
//     .execPopulate()
//     .then(user => {
//       const items = [];
//       user.cart.items.forEach(p => {
//         const modifiedItem = { product: p.productId, quantity: p.quantity };
//         items.push(modifiedItem);
//       });
//       const order = new Order({
//         items: items,
//         user: {
//           _id: this._id,
//           name: this.name
//         }
//       });
//       return order.save();
//     })
//     .then(_ => {
//       this.cart = { items: [] };
//       return this.save();
//     });
// };

module.exports = mongoose.model("User", userSchema);
