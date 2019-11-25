var http = require('http');
console.log("Go to localhost:8888 to see the output!");
http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("Hello World!");
    response.end();
}).listen(8888);