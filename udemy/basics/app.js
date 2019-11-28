// Included the http core module
const http = require('http');

// Custom file included
const routes = require('./routes');

// http is a core module to create a server
// createServer is a method of http core module which will
// create a server, and get a callback function to perform 
// certain operations whenever the server recieves response,
// also this function has two parameters request and response
// to get and send packets/data!

// We can simply pass routes as comment below
// and remove the callback function to make the code simple
http.createServer(/*routes*/(request, response)=>{
    // console.log(request.url, request.method, request.headers);
    // response.end("Page is not available now!");
    // process.exit();
    routes(request, response);

}).listen(3000);