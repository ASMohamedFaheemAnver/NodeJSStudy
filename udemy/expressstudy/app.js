const http = require('http');

const express = require('express');

const app = express();

app.use((request, response, next)=>{
    response.send('<h1>Hello from express!</h1>');
});

const PORT = 3000;

const server = http.createServer(app).listen(PORT);
console.log('Server is running on : localhost:' + PORT);