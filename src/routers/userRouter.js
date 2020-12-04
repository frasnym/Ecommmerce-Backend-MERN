const express = require("express");

const { authCheck } = require("../middlewares/auth");
const userController = require("../controllers/userController");

const router = new express.Router();

router.get("/", authCheck, userController.getUser);

module.exports = router;
