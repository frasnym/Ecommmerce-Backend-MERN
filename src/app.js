const express = require("express");
require("./db/mongoose");

const { i18next, i18nextMiddleware } = require("./utils/translation");
const { setResponseTemplate } = require("./middlewares/api");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");

const app = express();
app.use(express.json()); // body raw JSON
app.use(i18nextMiddleware.handle(i18next)); // we tell Express to use i18next's middleware
app.use("/users/auth", setResponseTemplate, authRouter);
app.use("/users", setResponseTemplate, userRouter);

module.exports = app;
