const express = require("express");

const { rules, inputBodyValidator } = require("../middlewares/validation");
const authController = require("../controllers/authController");

const router = new express.Router();

router.post(
	"/signup",
	[rules.signUp, inputBodyValidator],
	authController.signUp
);
router.post(
	"/signin",
	[rules.signIn, inputBodyValidator],
	authController.signIn
);

module.exports = router;
