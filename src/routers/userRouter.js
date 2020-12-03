const express = require("express");

// const v = require("../utils/validationRules");
// const { inputBodyValidator } = require("../middlewares/api");
const auth = require("../middlewares/auth");
const userController = require("../controllers/userController");

const router = new express.Router();

router.get("/", auth, userController.getUser);

module.exports = router;
