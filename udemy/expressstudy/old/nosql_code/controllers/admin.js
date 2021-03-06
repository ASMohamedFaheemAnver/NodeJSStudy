const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // console.log(errorTracer.lineTracer());
  // res.sendFile(path.join(rootDir, 'views', 'add-product.pug'));
  templateData = {
    pageTitle: "ADD PRODUCT",
    path: "/admin/add-product",
    editing: false
  };
  res.render(
    /*path.join(rootDir, 'views', 'add-product')*/ "admin/edit-product",
    templateData
  );
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  if (title && imageUrl && price && description) {
    const product = new Product(title, price, description, imageUrl, req.user._id);
    return product
      .save()
      .then(_ => {
        res.redirect("/");
      })
      .catch(err => {
        console.log(err);
      });
  }
  res.send("<p>PLEASE ENTER DATA TO SUBMIT!</p>");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      templateData = {
        pageTitle: "EDIT PRODUCT",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
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

  Product.updateByPk(prodId, {
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl
  })
    .then(_ => {
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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
  Product.deleteByPk(prodId)
    .then(_ => {
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};
