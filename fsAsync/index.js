const fs = require("fs");

//create a new file
fs.writeFile("read.txt", "Hello World,", (err, data) => {
  console.log("Created");
});

//append a new file
fs.appendFile('read.txt',' Welcome to Nodejs',(err)=>{
    console.log("Append")
})

//read file
fs.readFile('read.txt','utf-8',(err,data)=>{
    console.log(data);
})

//rename file
fs.rename('read.txt','readWrite.txt',(err)=>{
    console.log("Rename");
})

//delete file
fs.unlink("readWrite.txt", (err) => {
  console.log("Rename");
});
