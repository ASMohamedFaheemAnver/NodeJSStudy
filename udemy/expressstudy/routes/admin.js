const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');
// console.log(rootDir);

// /admin/add-product => GET
router.get('/add-product', (req, res, next)=>{
    // res.sendFile(path.join(rootDir, 'views', 'add-product.pug'));
    res.render(path.join(rootDir, 'views', 'add-product.hbs'), {pageTitle: 'ADD PRODUCT', isPageFound: true});
});

const products = [];

// /admin/add-product => POST
router.post('/add-product', (req, res, next)=>{
    // console.log(JSON.stringify(req.body));
    if(req.body.title){
        products.push({title: req.body.title});
        return res.redirect('/');
    }
    res.send('<p>PLEASE ENTER DATA TO SUBMIT!</p>');
});

exports.routes = router;
exports.products = products;