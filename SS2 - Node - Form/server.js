const http = require("http");
const port = 3333;
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  res.writeHead(200, "Content-Type", "text/html; charset=utf-8");
  const getForm = fs.readFileSync("./view/get-form.html", "utf8");
  const postForm = fs.readFileSync("./view/post-form.html", "utf8");

  res.write(postForm);
  res.end();

  const query = url.parse(req.url, true);
  if (req.method === "post")
    req
      .on("error", (err) => {
        console.err(err);
      })

      .on("data", (chuck) => {
        console.log(chuck.tostring());
      });
});
server.listen(port, () => {
  console.log("ok rồi a zai ");
});
