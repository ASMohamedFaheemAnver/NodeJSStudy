var http = require('http');
var url = require('url');

function startServer(route){
    http.createServer(function(request, response){
        var pathname = url.parse(request.url).pathname;
        console.log("Requested for : " + pathname);
        route(pathname);
        response.writeHead(200, {"Content-Type" : "text/plain"});
        response.write("HELLO FROM OUR APPLICATION!");
        response.end();
    }).listen(8888);
}

exports.startServer = startServer;