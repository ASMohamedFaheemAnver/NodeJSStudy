// const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/add-product', (request, response, next)=>{
    response.send(
        `<form action="/product" method="POST">
            <input type="text" name="title"/>
            <button type="submit">SUBMIT</button>
        </form>`);
});

app.post('/product', (request, response, next)=>{
    console.log(JSON.stringify(request.body));
    response.redirect('/');
});


app.get('/', (request, response, next)=>{
    response.send('<h1>Hello from express!</h1>');
});

const PORT = 3000;
app.listen(PORT);
// const server = http.createServer(app).listen(PORT);
console.log('Server is running on : localhost:' + PORT);