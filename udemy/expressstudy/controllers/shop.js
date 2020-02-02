const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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
  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        res.redirect("/products");
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
  Product.fetchAll()
    .then(products => {
      templateData = {
        prods: products,
        pageTitle: "SHOP",
        path: "/"
      };
      res.render("shop/index", templateData);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
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

  Product.findByPk(prodId)
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
    .deleteCart(prodId)
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
