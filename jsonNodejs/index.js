const fs = require('fs')
const http = require('http')

const userInfo = {
    id:1,
    name:"Alim Mohammad",
    username:"alim",
    email:"Alim.Mohammad@ascendtek.com",
    position:"UI Developer",
    phone:8180036208,
    city:"malkapur",
    pincode:443101
}

http.createServer((req,res)=>{
      res.writeHead(200,{'Content-Type':'application/json'})
      const jsonStringfy = JSON.stringify(userInfo)
      
fs.writeFile("json1.json", jsonStringfy, (err) => {
  if (err) throw err;
});

fs.readFile("json1.json", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
  const myData = JSON.parse(data);
  console.log(myData);
});

const jsonParse = JSON.parse(jsonStringfy);
console.log(jsonParse);
      res.end(jsonStringfy);
}).listen(8080)

