const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 3000;

 

// B1 : khởi tạo server
const server = http.createServer((req, res) => {
// B2 : tạo folder final.txt
// B3 : require fs vào và sử dụng hàm fs.readFileSync
const readFinal = fs.readFileSync("final.txt", "utf-8");
// B4 : in ra màn hình client
res.writeHead(200, { "content-Type": "text/html" });
res.write(readFinal)
res.end();

})
server.listen(3000, function () {
    console.log("OK rồi a zai");
  });
  