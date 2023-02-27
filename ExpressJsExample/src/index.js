const express = require("express");
const app = express();
const path = require("path");
var requests = require("requests");
const hbs = require('hbs')

const PORT = 8080;

const userInfo = {
  id: 1,
  name: "Alim Mohammad",
  username: "alim",
  email: "Alim.Mohammad@ascendtek.com",
  position: "UI Developer",
  phone: 8180036208,
  city: "malkapur",
  pincode: 443101,
};

// built in middleware
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
//to set the view engine
app.set('view engine','hbs');

hbs.registerPartials(partialPath);

app.set("views", templatePath);


//  app.use(express.static(staticPath));


//template engine route
app.get("/",(req,res)=>{
  res.render('index',{
    title:"Dashboard",
    heading:"Dashboard"
  })
})
app.get("/about", (req, res) => {
  res.render("index", {
    title: "About",
    heading: "About US",
    info: userInfo,
  });
// requests(
//   `https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=039b0b21776bac17fafd53699b9f107a`
// )
//   .on("data", (chunk) => {
//     const myData = JSON.parse(chunk);
//     const arrData = [myData];
//     res.write(
//       ` City name is ${arrData[0].name} and temp is ${arrData[0].main.temp}`
//     );
//   })
//   .on("end", (err) => {
//     if (err) return console.log("connection closed due to errors", err);
//     res.end();
//   });
});
app.get("/weather", (req, res) => {
  res.render("weather", {
    title: "Weather",
  });
});

// used universal operator for 404 page error
app.get('*',(req,res)=>{
    res.render("404", {
      errorcomement:'Opps page not found'
    });
})
// app.get("/", (req, res) => {
//   res.send("Welcome to Dashboard screen.");
// });

// app.get("/about", (req, res) => {
//   res.status(200).send("Welcome to Aboutus screen.");
// });
// app.get("/contact", (req, res) => {
//   res.status(200).send(userInfo);
// });

app.listen(PORT);
