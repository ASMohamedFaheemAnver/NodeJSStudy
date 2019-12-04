const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');
// console.log(rootDir);

// /admin/add-product => GET
router.get('/add-product', (req, res, next)=>{
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next)=>{
    console.log(JSON.stringify(req.body));
    res.redirect('/');
});

module.exports = router;