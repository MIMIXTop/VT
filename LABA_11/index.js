const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {

    switch(req.url){
        case '/':
            res.statusCode = 200
            res.setHeader("Content-Type", 'text/plain')

            res.end('Welcome to the homepage!\n')
            break
        case '/about':
            res.statusCode = 200
            res.setHeader("Content-Type", 'text/plain')
        
            res.end('This is the about page.\n')
            break

        case '/submit':
            if (req.method === 'POST' || req.method === 'GET') {
                res.statusCode = 200
                res.setHeader("Content-Type", 'text/plain')
        
                res.end('Data received via POST!\n')
            } else {
                res.statusCode = 405
                res.setHeader("Content-Type", 'text/plain')

                res.end('Method Not Allowed.\n')
            }
            break
        default:
            res.statusCode = 404
            res.setHeader("Content-Type", 'text/plain')

            res.end('404 Not Found.\n')
            break
    }

});

server.listen(port, hostname , () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});