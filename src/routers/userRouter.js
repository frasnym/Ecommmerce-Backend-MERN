const express = require("express");

const auth = require("../middlewares/auth");
const userController = require("../controllers/userController");

const router = new express.Router();

router.get("/", auth, userController.getUser);

module.exports = router;
