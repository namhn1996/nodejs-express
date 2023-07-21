const express = require("express");
const app = express();
const port = 3333;
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>This is homepage</h1>");
});
app.get("/overview", (req, res) => {
  res.send("<h1>This is overview page</h1>");
});
app.get("/product", (req, res) => {
  res.send("<h1>This is product page</h1>");
});

app.get("/api/v1/users", (req, res) => {
  fs.readFile("users.json", (err, data) => {
    if (err) return err;
    res.send(JSON.parse(data));
  });
});
app.get("/api/v1/users/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("users.json", (err, data) => {
    if (err) return err;
    const users = JSON.parse(data);
    const userid = users.find((user) => user._id == id);
    res.send(userid);
  });
});
app.post("/api/v1/users", (req, res) => {
  const user = req.body;
  fs.readFile("users.json", (err, data) => {
    if (err) return err;
    const users = JSON.parse(data);
    users.some((user) => {
      users.email == user.email;
    })
      ? res.send("User already exists")
      : users.push(user);
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) return err;
      res.send(users);
    });
  });
});
app.put("/api/v1/users/:id", (req, res) => {
  const user = req.body;
  const id = req.params.id;
  fs.readFile("users.json", (err, data) => {
    if (err) return err;
    const users = JSON.parse(data);
    const dataIndex = users.findIndex((user) => user._id == id);
    console.log(dataIndex);
    if (dataIndex == -1) {
      res.status(404).json({ message: "User not found" });
    } else {
      users[dataIndex] = user;
      fs.writeFileSync("users.json", JSON.stringify(users));
      res
        .status(201)
        .json({ message: `Update users: ${users[dataIndex]._id} success` });
    }
  });
});
app.get("/*", (req, res) => {
  res.send("<h1>PAGE NOT FOUND</h1>");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
