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
  // console.log(errorTracer.lineTracer());
  // console.log(JSON.stringify(req.body));
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  if (title && imageUrl && price && description) {
    // const product = new Product(null, title, imageUrl, price, description);
    // // console.log(product);
    // return product.save().then(()=>{
    //     res.redirect('/');
    // }).catch(err=>{
    //     console.log(err);
    // });
    // products.push({title: req.body.title});
    return Product.create({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
      .then(result => {
        res.redirect("/");
      })
      .catch(err => {
        console.log(err);
      });
  }
  res.send("<p>PLEASE ENTER DATA TO SUBMIT!</p>");
};

exports.getEditProduct = (req, res, next) => {
  // console.log(errorTracer.lineTracer());
  // res.sendFile(path.join(rootDir, 'views', 'add-product.pug'));
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  //   Product.findById(prodId, product => {
  //     if (!product) {
  //       return res.redirect("/");
  //     }

  //     templateData = {
  //       pageTitle: "EDIT PRODUCT",
  //       path: "/admin/edit-product",
  //       editing: editMode,
  //       product: product
  //     };
  //     res.render(
  //       /*path.join(rootDir, 'views', 'add-product')*/ "admin/edit-product",
  //       templateData
  //     );
  //   });
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

  //   const updatedProduct = new Product(
  //     prodId,
  //     title,
  //     imageUrl,
  //     price,
  //     description
  //   );
  Product.findByPk(prodId)
    .then(product => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      return product.save();
    })
    .then(_ => {
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
  //   updatedProduct.save();
  //   res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  //   Product.fetchAll(products => {
  //     templateData = {
  //       prods: products,
  //       pageTitle: "ADMIN PRODUCTS",
  //       path: "/admin/products",
  //       hasProds: products.length > 0
  //     };
  //     // console.log(templateData);
  //     res.render("admin/product-list", templateData);
  //     // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  //   });
  Product.findAll()
    .then(products => {
      templateData = {
        prods: products,
        pageTitle: "ADMIN PRODUCTS",
        path: "/admin/products"
      };
      // console.log(templateData);
      res.render("admin/product-list", templateData);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.delete(prodId);
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(_ => {
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};
