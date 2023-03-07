const mongoose = require('mongoose')

const url = "mongodb://localhost:27017/students";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected Successfully")
  })
  .catch((err) => {
    console.log("Disconnected");
  });