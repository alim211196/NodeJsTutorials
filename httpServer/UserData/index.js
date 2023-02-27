const http = require("http");
const fs = require('fs')

http
  .createServer((req, res) => {
    if (req.url == "/userinfo") {
      res.writeHead(200, { "Content-Type": "application/json" });
      fs.readFile('F:/NodeJSProjects/NodeJsTutorials/httpServer/UserApi/userapi.json',"utf-8",(err,data)=>{
        if(err) throw err
     //   const mydata =JSON.parse(data)
          res.end(data);
      })
    } else if (req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("Dashboard");
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("404 error page");
    }
  })
  .listen(8080, "127.0.0.1", () => {
    console.log("Listening 8080");
  });
