// Included the http core module
var http = require('http');

// http is a core module to create a server
// createServer is a method of http core module which will
// create a server, and get a callback function to perform 
// certain operations whenever the server recieves response,
// also this function has two parameters request and response
// to get and send packets/data!

http.createServer((request, response)=>{
    // console.log(request.url, request.method, request.headers);
    // response.end("Page is not available now!");
    // process.exit();
    if(request.url=='/'){
        response.setHeader('Content-Type', 'text/html');
        response.write(
            `<html>
                <head>
                    <title>My first page!</title>
                </head>
                <body>
                    <form action="/message" method="POST">
                        <input type="text" name="message"/>
                        <button type="submit">SUBMIT</button>
                    </form>
                </body>
            </html>`);
        return response.end();
    }
    response.setHeader('Content-Type', 'text/html');
    response.write('<p>404 PAGE NOT FOUND!</p><br><p>Next</p>');
    response.end();

}).listen(3000);