var http = require('http');
var url = require('url');

function startServer(route, handle){
    http.createServer(function(request, response){
        var pathname = url.parse(request.url).pathname;
        console.log("New Requiest!");
        console.log("Requested for : " + pathname);
        route(handle, pathname);
        response.writeHead(200, {"Content-Type" : "text/plain"});
        response.write("HELLO FROM OUR APPLICATION!");
        response.end();
    }).listen(8888);
}

exports.startServer = startServer;