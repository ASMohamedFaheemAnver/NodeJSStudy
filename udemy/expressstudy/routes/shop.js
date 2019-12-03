const express = require('express');

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.send('<p>http://localhost:3000/</p>');
});

module.exports = router;