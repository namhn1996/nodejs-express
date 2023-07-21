const express = require("express");
const port = 8888;
const app = express();
const fs = require("fs");

const user = {
  username: "admin",
  password: "123",
};
const reqUser = {
  username: "admin",
  password: "123",
};
const middleWareCheckLogin = (req, res, next) => {
  // logic code của middleware
  if (reqUser.username == user.username && reqUser.password == user.password) {
    console.log("Login Success");
    next();
  } else {
    console.log("Login Failed");
    res.redirect("/login");
  }
};

app.get("/", (req, res) => {
  res.send("<h1>Hello Home Page</h1>");
});

app.get("/payment", middleWareCheckLogin, (req, res) => {
  res.send("<h1>Trang này yêu cầu login</h1>");
});

app.get("/login", (req, res) => {
  res.send("<h1>Hello Login Page</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
