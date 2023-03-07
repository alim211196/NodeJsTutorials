const mongoose = require('mongoose')

const url = "mongodb://localhost:27017/users-db";

mongoose.connect(url).then(()=>{
    console.log("Connected")

}).catch((err)=>{
  console.log("No Connection");
})