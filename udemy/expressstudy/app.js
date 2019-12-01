// const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes);

app.use(shopRoutes);

const PORT = 3000;
app.listen(PORT);
// const server = http.createServer(app).listen(PORT);
console.log('Server is running on : localhost:' + PORT);