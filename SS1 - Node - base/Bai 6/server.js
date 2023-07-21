const http = require("http");
const url = require("url");
const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {
  // đọc file
  const datajson = fs.readFileSync("./data.json", "utf-8");
  const dataObj = JSON.parse(datajson);
  console.log(dataObj);
  const { query, pathname } = url.parse(req.url, true);
  res.writeHead(200, { "content-Type": "application/json", charset: "utf-8" });
  if (pathname === "/" || pathname === "/home") {
    res.write("<h1>Trang chủ</h1>");
  }else if(pathname === "/api"){
    res.write(datajson);
  }
   else if (pathname === "/overview") {
    res.write("<h1>This is overview page</h1>");
  } else if (pathname === "/product") {
    res.write("<h1>This is product page</h1>");
  } else {
    res.write("<h1>PAGE NOT FOUND</h1>");
  }
  res.end();
});
server.listen(3000, function () {
  console.log("OK rồi a zai");
});
