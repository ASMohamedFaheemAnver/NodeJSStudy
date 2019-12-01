// const http = require('http');

const express = require('express');

const app = express();

app.use('/add-product', (request, response, next)=>{
    response.send('<h1>You can add your product!</h1>');
});


app.use('/', (request, response, next)=>{
    response.send('<h1>Hello from express!</h1>');
});

const PORT = 3000;
app.listen(PORT);
// const server = http.createServer(app).listen(PORT);
console.log('Server is running on : localhost:' + PORT);