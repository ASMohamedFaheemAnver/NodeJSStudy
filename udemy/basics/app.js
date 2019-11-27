// Included the http core module
const http = require('http');
const fs = require('fs');

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

    const method = request.method;
    const url = request.url;
    if(url=='/'){
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

    if(url==='/message' && method==='POST'){
        const body = [];

        request.on('data', (chunck)=>{
            body.push(chunck);
        });

        request.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('postrequest.txt', message);
        });
        response.statusCode = 302;
        response.setHeader('Location' , '/');
        // response.writeHead(302, {'Location' : '/'});
        return response.end();
    }

    response.setHeader('Content-Type', 'text/html');
    response.write('<p>404 PAGE NOT FOUND!</p><br><p>Next</p>');
    response.end();

}).listen(3000);