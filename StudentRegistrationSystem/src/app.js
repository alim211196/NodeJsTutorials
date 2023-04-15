const express = require('express')
const app = express()
const cors = require("cors");
const router = require('./router/Router')
const PORT = process.env.PORT || 3000
const bodyParser = require("body-parser");

require('./db/conn')

app.use(express.json())
app.use(cors());
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT)