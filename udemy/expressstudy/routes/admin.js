const express = require('express');

const router = express.Router();

router.get('/add-product', (request, response, next)=>{
    response.send(
        `<form action="/product" method="POST">
            <input type="text" name="title"/>
            <button type="submit">SUBMIT</button>
        </form>`);
});

router.post('/product', (request, response, next)=>{
    console.log(JSON.stringify(request.body));
    response.redirect('/');
});

module.exports = router;