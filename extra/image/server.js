const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/api/images', (req, res, next) => {
    res.send('UNDER CONSTRUCTION!');
});

app.post('/api/images', (req, res, next) => {
    const base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
    require("fs").writeFile("out.png", base64Data, 'base64', function (err) {
        if(err){
            console.log(err);
        }
        console.log('SUCCESS!');
    });
});

http.createServer(app).listen(3000);