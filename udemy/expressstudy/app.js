// const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use((req, res, next)=>{
    res.status(404).send('<h1>404 PAGE NOT FOUND!</h1>');
});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log('Server is running on : localhost:' + PORT);
});
// const server = http.createServer(app).listen(PORT);