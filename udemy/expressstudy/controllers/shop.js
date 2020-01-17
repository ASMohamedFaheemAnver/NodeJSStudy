// const path = require('path');
// const rootDir = require('../util/path');

// const products = [];
const Product = require("../models/product");
// const errorTracer = require('../debug/error-tracer');
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  // console.log(errorTracer.lineTracer());
  // console.log(adminData.products);
  // let products = adminData.products;
  // console.log(products.length);
  Product.fetchAll(products => {
    templateData = {
      prods: products,
      pageTitle: "ALL PRODUCTS",
      path: "/products",
      hasProds: products.length > 0
    };
    // console.log(templateData);
    res.render("shop/product-list", templateData);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render("shop/product-detail", {
      product: product,
      path: "/products",
      pageTitle: product.title
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    templateData = {
      prods: products,
      pageTitle: "SHOP",
      path: "/"
    };
    // console.log(templateData);
    res.render("shop/index", templateData);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  });
};

exports.getCart = (req, res, next) => {
  Cart.getProducts(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "YOUR CART",
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product=>{
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "CHECKOUT"
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "YOUR ORDERS"
  });
};
