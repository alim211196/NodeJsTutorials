const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;

const router = require("./router/usersRouter");
require("./db/conn");



app.use(express.json());

app.use(router);



app.listen(PORT);
