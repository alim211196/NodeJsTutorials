const express = require('express')
const app = express()
const cors = require("cors");
const router = require('./router/studentsRouter')
const PORT = process.env.PORT || 3000
require('./db/conn')

app.use(express.json())
app.use(cors());
app.use(router);


app.listen(PORT)