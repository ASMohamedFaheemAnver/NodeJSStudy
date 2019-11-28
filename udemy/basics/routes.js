const fs = require('fs');

const requestHandler = (request, response) => {
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

        // We returning this code because we don't want to execute 
        // 404 page and setHeader after the below code listening to
        // 'end' emiter
        return request.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // We are bloking the code by execute writeFileSync
            // fs.writeFileSync('postrequest.txt', message);

            // We use writeFile to wirte the file asynchronously
            // and we write call back function handle if there is any 
            // error in our code!
            fs.writeFile('postrequest.txt', message ,(error)=>{
                if(error){
                    console.log(error);
                }
                response.statusCode = 302;
                response.setHeader('Location' , '/');
                // response.writeHead(302, {'Location' : '/'});
                return response.end();
            });
        });
    }

    response.setHeader('Content-Type', 'text/html');
    response.write('<p>404 PAGE NOT FOUND!</p><br><p>Next</p>');
    response.end();
};

module.exports = requestHandler;