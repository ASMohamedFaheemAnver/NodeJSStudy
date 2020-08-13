const Product = require("../models/product");
const Order = require("../models/order");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const stripe = require("stripe")(process.env.stripe);

const ITEMS_PER_PAGE = 2;

exports.getProducts = (req, res, next) => {
  let page = +req.query.page || 1;
  let count;
  Product.find()
    .countDocuments()
    .then((numberOfProduct) => {
      count = numberOfProduct;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    // .select("title price -_id")
    // .populate("userId", "name")
    .then((products) => {
      templateData = {
        prods: products,
        pageTitle: "ALL PRODUCTS",
        path: "/products",
        current: page,
        hasNext: ITEMS_PER_PAGE * page < count,
        hasPrevious: page > 1,
        nextPage: parseInt(page) + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(count / ITEMS_PER_PAGE),
      };
      res.render("shop/product-list", templateData);
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        res.redirect("/products");
        return;
      }
      templateData = {
        product: product,
        path: "/products",
        pageTitle: product.title,
      };
      res.render("shop/product-detail", templateData);
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  let page = +req.query.page || 1;
  let count;
  Product.find()
    .countDocuments()
    .then((numberOfProduct) => {
      count = numberOfProduct;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      templateData = {
        prods: products,
        pageTitle: "SHOP",
        path: "/",
        current: page,
        hasNext: ITEMS_PER_PAGE * page < count,
        hasPrevious: page > 1,
        nextPage: parseInt(page) + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(count / ITEMS_PER_PAGE),
      };

      res.render("shop/index", templateData);
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "YOUR CART",
        products: user.cart.items,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((_) => {
      res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then((_) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "CHECKOUT",
  });
};

exports.postOrder = (req, res, next) => {
  let total = 0;
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      user.cart.items.forEach((p) => {
        total += p.quantity * p.productId.price;
      });

      const product = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          // mongoose will take care of that
          _id: req.user,
        },
        items: product,
      });
      return order.save();
    })
    .then((_) => {
      // req.user.cart.items = [];
      // req.user.save();
      stripe.paymentIntents
        .create({
          amount: total * 100,
          currency: "usd",
          description: "A demo nodejs payment!",
          // payment_method: "card_1GFfThIW47ITkVAX1Ety3ygc"
        })
        .then((result) => {
          req.user.clearCart();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .then((_) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user._id": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "YOUR ORDERS",
        orders: orders,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  const invoiceName = orderId + ".pdf";
  const invoicePath = path.join("data", "invoices", invoiceName);
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return next(new Error("No order found!"));
      }
      if (order.user._id.toString() !== req.user._id.toString()) {
        return next(new Error("Unauthorized!"));
      }

      const pdfDoc = new PDFDocument();
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Type", "application/pdf");
      // inline, attachment
      res.setHeader(
        "Content-Disposition",
        "inline; filename='" + invoiceName + "'"
      );
      pdfDoc.pipe(res);
      // pdfDoc.text("INVOICE!");
      pdfDoc.fontSize(11).text("INVOICE!", { underline: true });
      let totalPrice = 0;
      order.items.forEach((prod) => {
        totalPrice += prod.quantity * prod.product.price;
        pdfDoc.text(
          prod.product.title +
            "|" +
            prod.quantity +
            " x " +
            "$" +
            prod.product.price
        );
      });
      pdfDoc.text("TOTAL : $" + totalPrice);

      pdfDoc.end();
      // fs.readFile(invoicePath, (err, data) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   res.setHeader("Content-Type", "application/pdf");
      //   // inline, attachment
      //   res.setHeader(
      //     "Content-Disposition",
      //     "inline; filename='" + invoiceName + "'"
      //   );
      //   res.send(data);
      // });
      // const file = fs.createReadStream(invoicePath);
      // res.setHeader("Content-Type", "application/pdf");
      // res.setHeader("Content-Type", "application/pdf");
      // // inline, attachment
      // res.setHeader(
      //   "Content-Disposition",
      //   "inline; filename='" + invoiceName + "'"
      // );
      // file.pipe(res);
    })
    .catch((err) => {
      next(err);
    });
};
