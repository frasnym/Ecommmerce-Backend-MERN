const express = require("express");

const { authCheckUser } = require("../middlewares/auth");
const userController = require("../controllers/userController");

const router = new express.Router();

router.get("/", authCheckUser, userController.getUser);

module.exports = router;
