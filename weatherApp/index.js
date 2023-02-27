const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("./home.html", "utf-8");

const replaceFn = (tempVal, orgVal) => {
  let temp = tempVal.replace("{%tempval%}", orgVal.main.temp);
  temp = temp.replace("{%tempmin%}", orgVal.main.temp_min);
  temp = temp.replace("{%tempmax%}", orgVal.main.temp_max);
  temp = temp.replace("{%location%}", orgVal.name);
  temp = temp.replace("{%country%}", orgVal.sys.country);
  temp = temp.replace("{%tempstatus%}", orgVal.weather[0].main);
  return temp;
};
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=039b0b21776bac17fafd53699b9f107a"
    )
      .on("data", (chunk) => {
        const myData = JSON.parse(chunk);
        const arrData = [myData];
        const realData = arrData.map((val) => replaceFn(homeFile, val)).join("");
         res.write(realData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });
  }
});

server.listen(8080,"127.0.0.1");
