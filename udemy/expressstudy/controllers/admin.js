const Product = require('../models/product');

exports.getAddProduct = (req, res, next)=>{
    // console.log(errorTracer.lineTracer());
    // res.sendFile(path.join(rootDir, 'views', 'add-product.pug'));
    templateData = { 
        pageTitle: 'ADD PRODUCT', 
        path: '/admin/add-product',
        editing: false
    };
    res.render(/*path.join(rootDir, 'views', 'add-product')*/ 'admin/edit-product', templateData);
}

exports.postAddProduct = (req, res, next)=>{
    // console.log(errorTracer.lineTracer());
    // console.log(JSON.stringify(req.body));
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    if(title && imageUrl && price && description){
        const product = new Product(null, title, imageUrl, price, description);
        // console.log(product);
        product.save();
        // products.push({title: req.body.title});
        return res.redirect('/');
    }
    res.send('<p>PLEASE ENTER DATA TO SUBMIT!</p>');
}

exports.getEditProduct = (req, res, next)=>{
    // console.log(errorTracer.lineTracer());
    // res.sendFile(path.join(rootDir, 'views', 'add-product.pug'));
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, (product)=>{
        if(!product){
            return res.redirect('/');
        }

        templateData = { 
            pageTitle: 'EDIT PRODUCT', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        };
        res.render(/*path.join(rootDir, 'views', 'add-product')*/ 'admin/edit-product', templateData);
    });
}

exports.postEditProduct = (req, res, next)=>{
    const prodId = req.body.productId;
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    const updatedProduct = new Product(prodId, title, imageUrl, price, description);
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) =>{
    Product.fetchAll(products=>{
        templateData = {
            prods: products, 
            pageTitle: 'ADMIN PRODUCTS', 
            path: '/admin/products',
            hasProds: products.length>0,
        };
        // console.log(templateData);
        res.render('admin/product-list', templateData);
        // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    });
}