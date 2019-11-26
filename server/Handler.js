function home(response){
    console.log("Excecuting home handler!\n");

    var htmlFile = 
    '<html>' +
    '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; charset-UTF-8"/>'+
    '</head>'+
    '<body>' +
        '<form action="/review" method="post">' +
            '<textarea name="text" rows="20" cols="60"></textarea>' +
            '<br>' +
            '<input type="submit" value="SUBMIT TEXT"/>' +
        '</form>' +
    '</body>'+
    '</body>' +
    '</html>'
    ;
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write(htmlFile);
    response.end();
}

function review(response){
    console.log("Executing review handler!\n");
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("HELLO FROM REVIEW!");
    response.end();
}

exports.home = home;
exports.review = review;