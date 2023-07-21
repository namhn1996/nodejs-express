const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));

// 1: Express là gì?
// Là 1 framewwork server xây dựng  dựa trên nền tảng Node JS
// Express giúp chúng ta dễ dàng sử dụng các hàm có sẵn để viết API dễ dàng hơn
// Express hoạt động nhanh, câu lệnh ngắn gọn

// Khái niệm routing trong Express
// Cấu trúc: app.GET,POST,PUT,DELETE,PATCH('/route',(req,res) => {
// req là 1 object chứa toàn bộ thông tin người dùng gửi về cho server
// res là 1 object chứa các phương thức mà server gửi về cho client
// enter logic code
// })
const dataUsers = {
  users: [
    {
      name: "Nguyen",
      address: "Ha Noi",
      phone: "123",
    },
    {
      name: "Meo",
      address: "Ha Nam",
      phone: "1234",
    },
    {
      name: "Cho",
      address: "Tokyo",
      phone: "1235",
    },
  ],
};

app.get("/json/:id", (req, res) => {
  res.send(users);
  // Định nghĩa query: domain/users?name=Nguyen&address=Ha Noi
  // Định  nghĩa params: domain/users/1
});
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});
app.get("/products", (req, res) => {
  res.send("<h1>Products</h1>");
});
app.get("/product-detail", (req, res) => {
  res.send("<h1>Detail Page</h1>");
});
app.post("/products", (req, res) => {
  const data = req.body;
  dataUsers.users.push(data);
  res.send(dataUsers);
});

const dataJson = require("./data.json");
console.log("data",dataJson);
app.get("/users", (req, res) => {
  res.send(dataJson);
});
app.post("/users", (req, res) => {
  const data = req.body;
  dataJson.users.push(data);
  fs.writeFileSync("./data.json", JSON.stringify(dataJson));
  res.send(dataJson);
});
// Bài tập: Tạo 1 file data.json chứa data users như trên
// Sau khi push sử dụng method post, log ra data xem nhận được chưa
// Khi đã đọc đc data từ req.body sử dụng lệnh witerFile để thêm dữ liệu vào file data.json
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
