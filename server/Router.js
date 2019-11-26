function route(handle, pathname){
    console.log("Routing a requies for : " + pathname);
    if(typeof handle[pathname] === 'function'){
        handle[pathname]();
    }else{
        console.log("No handler for : " + pathname + "\n");
    }
}

exports.route = route;