const http = require("http");
const url = require("url");
const port = 3000;


const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  res.writeHead(200, { "content-Type": "text/html" });
  if (pathname === "/" || pathname === "/home") {
    res.write("<h1> Hello World </h1>");
  } else if (pathname === "/product") {
    res.write("<h1> Hello Product </h1>");
  } else if (pathname === "/contact") {
    res.write("<h1> Hello Contact </h1>");
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1> Not Found </h1>");
  }
  res.end();
});
server.listen(3000, function () {
  console.log("OK rồi a zai");
});
