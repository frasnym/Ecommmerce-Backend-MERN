const express = require("express");
const bodyParser = require("body-parser");
require("./db/mongoose");

const mainRouter = require("./routers/main");
const userRouter = require("./routers/user");

const app = express();
//! app.use(express.json()); // body raw JSON
// app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(mainRouter);
app.use("/api", userRouter);

module.exports = app;
