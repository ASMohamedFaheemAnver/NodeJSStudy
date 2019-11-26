function route(handle, pathname, response, reviewData){
    console.log("Routing a requies for : " + pathname);
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response, reviewData);
    }else{
        console.log("No handler for : " + pathname + "\n");
        response.writeHead(404, {"Content-Type" : "text/plain"});
        response.write("404 PAGE NOT FOUND!");
        response.end();
    }
}

exports.route = route;