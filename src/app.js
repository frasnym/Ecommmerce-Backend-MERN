const express = require("express");
const bodyParser = require("body-parser");
require("./db/mongoose");

const { i18next, i18nextMiddleware } = require("./utils/translation");
const { setResponseTemplate } = require("./middlewares/api");
const authRouter = require("./routers/authRouter");

const app = express();
//! app.use(express.json()); // body raw JSON
// app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(i18nextMiddleware.handle(i18next)); // we tell Express to use i18next's middleware
app.use("/auth", setResponseTemplate, authRouter);

module.exports = app;
