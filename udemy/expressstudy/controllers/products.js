// const path = require('path');
// const rootDir = require('../util/path');

const products = [];

exports.getAddProduct = (req, res, next)=>{
    // res.sendFile(path.join(rootDir, 'views', 'add-product.pug'));
    templateData = {
        prods: products, 
        pageTitle: 'ADD PRODUCT', 
        hasProds: products.length>0,
        isPageFound: true,
        isProductCSS: true,
        isMainCSS: true,
        isShopCSS: false,
    };
    res.render(/*path.join(rootDir, 'views', 'add-product')*/ 'add-product', templateData);
}

exports.postAddProduct = (req, res, next)=>{
    // console.log(JSON.stringify(req.body));
    if(req.body.title){
        products.push({title: req.body.title});
        return res.redirect('/');
    }
    res.send('<p>PLEASE ENTER DATA TO SUBMIT!</p>');
}

exports.getProducts = (req, res, next)=>{
    // console.log(adminData.products);
    // let products = adminData.products;
    // console.log(products.length);
    templateData = {
        prods: products, 
        pageTitle: 'SHOP', 
        hasProds: products.length>0,
        isPageFound: true,
        isProductCSS: false,
        isMainCSS: true,
        isShopCSS: true,
    };
    res.render('shop', templateData);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
}