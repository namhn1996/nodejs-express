const fs = require("fs");

const data = fs.readFileSync("read-this.txt", "utf-8");

// console.log(data);
const dataa = fs.readFile("read-this.txt", "utf-8", function (err, data) {
    if (err) {
        console.log(err)
  
    } else {
      console.log(data);
    }
});
console.log("aaaa" , data);
fs.writeFileSync("input.txt", "Đời như lồn", "utf-8");
