const http = require("http");
const port = 3000;
const fs = require("fs");
const nodeStatic = require("node-static");
const file = new nodeStatic.Server("./public");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  // file.serve(req, res);
  // Tạo ra 3 file (firtData,midData,lastData) txt trong folder content cùng cấp với file server.js
  // 1. Đọc dữ liệu từ file đó
  // 2. Ghi dữ liệu từ 3 file vào 1 file mới là finalData
  //   const firtData = fs.readFileSync("content/firtData.txt", "utf8");
  //   const midData = fs.readFileSync("content/midData.txt", "utf8");
  //   const lastData = fs.readFileSync("content/lastData.txt", "utf8");
  //   const finalData = `${firtData}\n${midData}\n${lastData}`;
  const finalData = fs.readFileSync("./content/finalData.txt", "utf8");
  console.log(finalData);
  //   console.log(finalData);
  let readContentHTML = fs.readFileSync("./view/content.html", "utf8");
  res.write(readContentHTML);
  res.end();
});

server.listen(port, () => {
  console.log("ok rồi a zai");
});
