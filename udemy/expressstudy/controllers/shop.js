const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select("title price -_id")
    // .populate("userId", "name")
    .then(products => {
      templateData = {
        prods: products,
        pageTitle: "ALL PRODUCTS",
        path: "/products",
        isAuthendicated: req.session.isLoggedIn
      };
      res.render("shop/product-list", templateData);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        res.redirect("/products");
        return;
      }
      templateData = {
        product: product,
        path: "/products",
        pageTitle: product.title,
        isAuthendicated: req.session.isLoggedIn
      };
      res.render("shop/product-detail", templateData);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      templateData = {
        prods: products,
        pageTitle: "SHOP",
        path: "/",
        isAuthendicated: req.session.isLoggedIn
      };
      res.render("shop/index", templateData);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "YOUR CART",
        products: user.cart.items,
        isAuthendicated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(_ => {
      res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(_ => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "CHECKOUT",
    isAuthendicated: req.session.isLoggedIn
  });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      const product = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          // mongoose will take care of that
          _id: req.user
        },
        items: product
      });
      return order.save();
    })
    .then(_ => {
      // req.user.cart.items = [];
      // req.user.save();
      req.user.clearCart();
    })
    .then(_ => {
      res.redirect("/orders");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user._id": req.user._id })
    .then(orders => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "YOUR ORDERS",
        orders: orders,
        isAuthendicated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
};
