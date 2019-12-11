const express = require('express');
// const path = require('path');

const router = express.Router();
const adminData = require('./admin');

// const rootDir = require('../util/path');

router.get('/', (req, res, next)=>{
    // console.log(adminData.products);
    let products = adminData.products;
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
});

module.exports = router;