const fs = require("fs");

//create a new file
fs.writeFileSync("read.txt", "Hello World,");

//append a new file
fs.appendFileSync("read.txt", " Welcome to Nodejs");

//read file
const buf_data = fs.readFileSync("read.txt", "utf-8");
console.log(buf_data);

//rename file
fs.renameSync("read.txt", "readWrite.txt");

//delete file
fs.unlinkSync("readWrite.txt");
