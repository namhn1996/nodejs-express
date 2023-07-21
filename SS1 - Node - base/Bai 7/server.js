const http = require("http");
const port = 3000;
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html", charset: "UTF-8" });
  let readFileOver = fs.readFileSync("./view/overview.html", "utf-8");
  let readFileProduct = fs.readFileSync("./view/product.html", "utf-8");

  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/overview") {
    res.write(readFileOver);
  } else if (pathname === "/product") {
    res.write(readFileProduct);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1> Not Found </h1>");
  }
  res.end();
});
server.listen(port, () => console.log(`Listening on port ${port}!`));
