const Product = require('../models/product');

exports.getAddProduct = (req, res, next)=>{
    // console.log(errorTracer.lineTracer());
    // res.sendFile(path.join(rootDir, 'views', 'add-product.pug'));
    templateData = { 
        pageTitle: 'ADD PRODUCT', 
        path: '/admin/add-product'
    };
    res.render(/*path.join(rootDir, 'views', 'add-product')*/ 'admin/add-product', templateData);
}

exports.postAddProduct = (req, res, next)=>{
    // console.log(errorTracer.lineTracer());
    // console.log(JSON.stringify(req.body));
    if(req.body.title){
        const product = new Product(req.body.title);
        // console.log(product);
        product.save();
        // products.push({title: req.body.title});
        return res.redirect('/');
    }
    res.send('<p>PLEASE ENTER DATA TO SUBMIT!</p>');
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