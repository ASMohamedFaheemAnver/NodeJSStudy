// const path = require('path');
// const rootDir = require('../util/path');

// const products = [];
const Product = require("../models/product");
// const errorTracer = require('../debug/error-tracer');
// const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  // console.log(errorTracer.lineTracer());
  // console.log(adminData.products);
  // let products = adminData.products;
  // console.log(products.length);
  // Product.fetchAll(/*products => {
  //   templateData = {
  //     prods: products,
  //     pageTitle: "ALL PRODUCTS",
  //     path: "/products",
  //     hasProds: products.length > 0
  //   };
  //   // console.log(templateData);
  //   res.render("shop/product-list", templateData);
  //   // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  // }*/).then(([rows, fieldData])=>{
  //   templateData = {
  //     prods: rows,
  //     pageTitle: "ALL PRODUCTS",
  //     path: "/products",
  //     hasProds: rows.length > 0
  //   };
  //   res.render("shop/product-list", templateData);
  // }).catch(err=>{
  //   console.log(err);
  // });
  Product.findAll()
    .then(products => {
      templateData = {
        prods: products,
        pageTitle: "ALL PRODUCTS",
        path: "/products"
      };
      res.render("shop/product-list", templateData);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findById(
  //   prodId /*, product => {
  //   res.render("shop/product-detail", {
  //     product: product,
  //     path: "/products",
  //     pageTitle: product.title
  //   });
  // }*/
  // )
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/product-detail", {
  //       product: rows[0],
  //       path: "/products",
  //       pageTitle: rows[0].title
  //     });
  //   })
  //   .catch();
  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return;
      }
      templateData = {
        product: product,
        path: "/products",
        pageTitle: product.title
      };
      res.render("shop/product-detail", templateData);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  // Product.fetchAll(/*products => {
  //   templateData = {
  //     prods: products,
  //     pageTitle: "SHOP",
  //     path: "/"
  //   };
  //   // console.log(templateData);
  //   res.render("shop/index", templateData);
  //   // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  // }*/)
  //   .then(([rows, fieldData]) => {
  //     templateData = {
  //       prods: rows,
  //       pageTitle: "SHOP",
  //       path: "/"
  //     };
  //     // console.log(templateData);
  //     res.render("shop/index", templateData);
  //     // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  Product.findAll()
    .then(products => {
      templateData = {
        prods: products,
        pageTitle: "SHOP",
        path: "/"
      };
      // console.log(templateData);
      res.render("shop/index", templateData);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  // Cart.getProducts(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "YOUR CART",
  //       products: cartProducts
  //     });
  //   });
  // });
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "YOUR CART",
        products: products
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findById(
  //   prodId /*, product => {
  //   Cart.addProduct(prodId, product.price);
  // }*/
  // )
  //   .then(([rows, fieldData]) => {
  //     Cart.addProduct(prodId, rows[0].price);
  //     res.redirect("/cart");
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity += oldQuantity;
        // return fetchedCart.addProduct(product, {
        //   through: { quantity: newQuantity }
        // });
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(_ => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(_ => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
  // Product.findById(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect("/cart");
  // });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "CHECKOUT"
  });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    })
    .then(_ => {
      return fetchedCart.setProducts(null);
    })
    .then(_ => {
      res.redirect("/orders");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then(orders => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "YOUR ORDERS",
        orders: orders
      });
    })
    .catch(err => {
      console.log(err);
    });
};
