// const fs = require('fs');
// const path = require('path');

// const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

// module.exports = class Cart{
//     static addProduct(id, productPrice){
//         fs.readFile(p, (err, fileContent)=>{
//             let cart = {products: [], totalPrice: 0};
//             if(!err){
//                 cart = JSON.parse(fileContent);
//             }
//             const existingProductIndex = cart.products.findIndex(prod=> prod.id === id);
//             let existingProduct = cart.products[existingProductIndex];
//             let updatedProduct;
//             if(existingProduct){
//                 updatedProduct = {...existingProduct};
//                 updatedProduct.qty = updatedProduct.qty +1;
//                 cart.products = [...cart.products];
//                 cart.products[existingProductIndex] = updatedProduct;
//             }else{
//                 updatedProduct = {id: id, qty: 1};
//                 cart.products = [...cart.products, updatedProduct];
//             }
//             cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(productPrice);
//             fs.writeFile(p, JSON.stringify(cart), (err)=>{
//                 if(err){
//                     console.log(err);
//                 }
//             });
//         });
//     }

//     static deleteProduct(id, productPrice){
//         fs.readFile(p, (err, fileContent)=>{
//             if(err){
//                 return;
//             }
//             let cart = JSON.parse(fileContent);
//             const updatedCart = {...cart};
//             const product = updatedCart.products.find(p=>p.id===id);
//             if(!product){
//                 return;
//             }
//             const productQty = product.qty;
//             updatedCart.products = updatedCart.products.filter(p=>p.id!==id);
//             updatedCart.totalPrice = updatedCart.totalPrice - productPrice*productQty;

//             fs.writeFile(p, JSON.stringify(updatedCart), err=>{
//                 if(err){
//                     console.log(err);
//                 }
//             });
//         });
//     }
//     static getProducts(cb){
//         fs.readFile(p, (err, fileContent)=>{
//             if(err){
//                 console.log(err);
//                 return cb(null);
//             }
//             const cart = JSON.parse(fileContent);
//             cb(cart);
//         });
//     }
// }

const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;