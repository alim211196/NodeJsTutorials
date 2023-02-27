const express = require("express");
const app = express();
const PORT = 8080;
const sendEmail = require('./sendEmail')

app.get("/", (req, res) => {
  res.send("Server is live");
});

app.get("/mail", sendEmail);


const Start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`I am on port no: ${PORT}`);
    });
  } catch (error) {
    console.log(error)
  }
};

Start();
