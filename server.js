const http = require('http');
const static = require('node-static');

const files = new static.Server("./www");

const port = 3000;

http.createServer((req, resp) => {
    req.addListener("end", () => {
        files.serve(req, resp);
    }).resume();
}).listen(port);