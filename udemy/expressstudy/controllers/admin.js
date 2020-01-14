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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    if(title && imageUrl && price && description){
        const product = new Product(title, imageUrl, price, description);
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