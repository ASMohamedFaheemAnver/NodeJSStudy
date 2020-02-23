const Product = require("../models/product");

const { validationResult } = require("express-validator");

const fileHelper = require("../util/file");

exports.getAddProduct = (req, res, next) => {
  templateData = {
    pageTitle: "ADD PRODUCT",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null
  };
  res.render("admin/edit-product", templateData);
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;

  if (!image) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "ADD PRODUCT",
      path: "/admin/edit-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description
      },
      errorMessage: "Attached file is not an image!"
    });
  }

  const imageUrl = image.path;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors);
    return res.status(422).render("admin/edit-product", {
      pageTitle: "ADD PRODUCT",
      path: "/admin/edit-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
      },
      errorMessage: errors.array()[0].msg
    });
  }

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    // we can put req.user, mongoose will take car about id
    userId: req.user._id
  });

  return product
    .save()
    .then(_ => {
      res.redirect("/");
    })
    .catch(err => {
      // return res.status(500).render("admin/edit-product", {
      //   pageTitle: "ADD PRODUCT",
      //   path: "/admin/edit-product",
      //   editing: false,
      //   hasError: true,
      //   product: {
      //     title: title,
      //     imageUrl: imageUrl,
      //     price: price,
      //     description: description
      //   },
      //   errorMessage: "Database operaton failed, please try again!"
      // });
      // res.redirect("/500");
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      templateData = {
        pageTitle: "EDIT PRODUCT",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: null
      };
      res.render(
        /*path.join(rootDir, 'views', 'add-product')*/ "admin/edit-product",
        templateData
      );
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const image = req.file;
  const description = req.body.description;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "EDIT PRODUCT",
      path: "/admin/edit-product",
      editing: true,
      hasError: false,
      product: {
        title: title,
        price: price,
        description: description,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg
    });
  }

  let updatedData;

  if (image) {
    Product.findOne({ _id: prodId, userId: req.user._id })
      .then(p => {
        fileHelper.deleteFile(p.imageUrl);
      })
      .catch(err => {
        next(err);
      });
    updatedData = {
      title: title,
      price: price,
      description: description,
      imageUrl: image.path
    };
  } else {
    updatedData = {
      title: title,
      price: price,
      description: description
    };
  }

  Product.updateOne({ _id: prodId, userId: req.user._id }, updatedData)
    .then(_ => {
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    .then(products => {
      templateData = {
        prods: products,
        pageTitle: "ADMIN PRODUCTS",
        path: "/admin/products"
      };
      res.render("admin/product-list", templateData);
    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findOne({ _id: prodId, userId: req.user._id })
    .then(prod => {
      fileHelper.deleteFile(prod.imageUrl);
      return prod.delete();
    })
    .then(_ => {
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  // Product.deleteOne({ _id: prodId, userId: req.user._id })
  //   .then(_ => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     const error = new Error(err);
  //     error.httpStatusCode = 500;
  //     return next(error);
  //   });
};
