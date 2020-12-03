const express = require("express");
const bodyParser = require("body-parser");
require("./db/mongoose");

const { setResponseTemplate } = require("./middlewares/api");
const mainRouter = require("./routers/main");
const userRouter = require("./routers/userRouter");

const app = express();
//! app.use(express.json()); // body raw JSON
// app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(mainRouter);
app.use("/api", setResponseTemplate, userRouter);

module.exports = app;
