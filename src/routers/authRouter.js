const express = require("express");

const { authCheck } = require("../middlewares/auth");
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
router.get("/signout", authCheck, authController.signOut);

module.exports = router;
