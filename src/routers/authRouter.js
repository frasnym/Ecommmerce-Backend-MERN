const express = require("express");

const v = require("../utils/validationRules");
const { inputBodyValidator } = require("../middlewares/api");
const authController = require("../controllers/authController");

const router = new express.Router();

router.post("/signup", [v.signUp, inputBodyValidator], authController.signUp);
router.post("/signin", [v.signIn, inputBodyValidator], authController.signIn);

module.exports = router;
