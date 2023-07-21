const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    const {query,pathname} = url.parse(req.url,true)
    res.writeHead(200,{"content-Type":"text/plain","charset":"utf-8"})
    if(pathname === "/" || pathname === "/home"){
        res.write("<h1>Trang chủ</h1>")
    }else if(pathname === "/overview"){
        res.write("<h1>This is overview page</h1>")
    }else if(pathname === "/product"){
        res.write ("<h1>This is product page</h1>")
    }else{
        res.write("<h1>PAGE NOT FOUND</h1>")
    }
    res.end()
})
server.listen(3000, function () {
    console.log("OK rồi a zai");
})