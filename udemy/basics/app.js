// Included the http core module
var http = require('http');

// http is a core module to create a server
// createServer is a method of http core module which will
// create a server, and get a callback function to perform 
// certain operations whenever the server recieves response,
// also this function has two parameters request and response
// to get and send packets/data!

http.createServer((request, response)=>{
    console.log(request);
    response.end("Page is not available now!");
}).listen(3000);