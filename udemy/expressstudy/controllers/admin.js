const Product = require("../models/product");

const { validationResult } = require("express-validator");

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
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
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
      console.log(err);
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
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
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
        imageUrl: imageUrl,
        price: price,
        description: description,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg
    });
  }
  Product.updateOne(
    { _id: prodId, userId: req.user._id },
    {
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl
    }
  )
    .then(_ => {
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
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
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({ _id: prodId, userId: req.user._id })
    .then(_ => {
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};
