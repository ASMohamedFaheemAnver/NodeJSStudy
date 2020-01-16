// module.exports = function Product(){

// }
// const errorTracer = require('../debug/error-tracer');
const fs = require("fs");
const path = require("path");
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = cb => {
  // console.log(errorTracer.lineTracer());
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    // console.log(errorTracer.lineTracer());
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // console.log(errorTracer.lineTracer());
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(p => {
          return p.id === this.id;
        });
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        products = updatedProducts;
      } else {
        this.id = Math.random().toString();
        products.push(this);
      }
      fs.writeFile(p, JSON.stringify(products), err => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static delete(id){
    getProductsFromFile(products=>{
      const deletingProductId = products.findIndex(p=> p.id===id);
      const deletingProduct = products[deletingProductId];
      products.pop(deletingProduct);
      // products = products.filter(p=> p.id!==id);
      fs.writeFile(p, JSON.stringify(products), err => {
        if (err) {
          return console.log(err);
        }
        Cart.deleteProduct(id, deletingProduct.price);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => {
        return p.id === id;
      });
      cb(product);
    });
  }
};
