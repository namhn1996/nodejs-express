const http = require("http");
const port = 3000;
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html", charset: "UTF-8" });
  let readFileOver = fs.readFileSync("./view/overview.html", "utf-8");
  let readFileProduct = fs.readFileSync("./view/product.html", "utf-8");
  let readFileCart = fs.readFileSync("./view/cart-temple.html", "utf-8");
  let readFileSearch = fs.readFileSync("./view/search.html", "utf-8");
  let readFileCreate = fs.readFileSync("./view/create.html", "utf-8");
  const dataJson = JSON.parse(fs.readFileSync("./dev-data/data.json", "utf-8"));

  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/overview") {
    let readFileOverr = dataJson.map((fruit) => {
      return readFileCart
        .replace("{img}", fruit.image)
        .replace("{{productName}}", fruit.productName)
        .replace("{{quantity}}", fruit.quantity)
        .replace("{{price}}", fruit.price);
    });
    res.write(readFileOver.replace("{{cards}}", readFileOverr));
  } else if (pathname === "/search") {
    const searchText = query.q;
    console.log(searchText, "searchText");
    let result = dataJson.filter((item) => {
      if (item.productName && searchText) {
        return item.productName
          .toLowerCase()
          .includes(searchText.toLowerCase());
      }
      return [];
    });

    if (result.length === 0) {
      res.write(
        readFileSearch
          .replace("{{cart}}", "")
          .replace("{{message}}", "NOT FOUND")
      );
    } else {
      const Cart = result.map((product) => {
        return readFileCart
          .replace(/{{img}}/g, product.image)
          .replace("{{productName}}", product.productName)
          .replace("{{quantity}}", product.quantity)
          .replace("{{price}}", product.price)
          .replace("{{id}}", product.id);
      });
      res.write(
        readFileOver
          .replace(
            `<figure class="card"></figure>`,
            `<figure class="card">${readFileSearch}</figure>`
          )
          .replace(
            `<div class="container"></div>`,
            `<div class="container">${Cart}</div>`
          )
          .replace("{{message}}", "Find your fruit")
      );
    }
  } else if (pathname.includes("/product")) {
    const id = pathname.split("/")[pathname.split("/").length - 1];
    console.log(id);
    let product = dataJson.find((item) => {
      return item.id == id;
    });
    console.log(product);
    const fileProduct = readFileProduct
      .replace(/{{image}}/g, product.image)
      .replace("{{productName}}", product.productName)
      .replace("{{quantity}}", product.quantity)
      .replace("{{price}}", product.price)
      .replace("{{from}}", product.from)
      .replace("{{nutrients}}", product.nutrients)
      .replace("{{description}}", product.description)
      .replace("{{id}}", product.id);
    res.write(fileProduct);
  } else if (pathname === "/cart") {
    res.write(readFileCart);
  } else if (pathname === "/create") {
    res.write(readFileCreate);
  } else if (req.url.startsWith("/delete")) {
    // Lấy id url
    const idurl = req.url.split("/")[req.url.split("/").length - 1];
    console.log(idurl);
    const newListProduct = JSON.parse(dataJson).filter((pr) => pr.id !== idurl);
    fs.writeFileSync("./dev-data/data.json", newListProduct, "utf-8");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1> Not Found </h1>");
  }
  res.end();
});
server.listen(port, () => console.log(`Listening on port ${port}!`));
