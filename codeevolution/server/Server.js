var http = require('http');
var url = require('url');

function startServer(route, handle){
    http.createServer(function(request, response){
        var pathname = url.parse(request.url).pathname;
        console.log("New Requiest!");
        var reviewData = "";
        console.log("Requested for : " + pathname);
        request.setEncoding('utf8');

        request.on('data', function(chunk){
            reviewData += chunk;
        });

        request.on('end', function(){
            route(handle, pathname, response, reviewData);
        });
        // response.writeHead(200, {"Content-Type" : "text/plain"});
        // response.write("HELLO FROM OUR APPLICATION!");
        // response.end();
    }).listen(8888);
}

exports.startServer = startServer;