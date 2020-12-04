const express = require("express");

const { authCheck, authCheckUser } = require("../middlewares/auth");
const { rules, inputBodyValidator } = require("../middlewares/validation");
const cartController = require("../controllers/cartController");

const router = new express.Router();

router
	.route("/addtocart")
	.post(
		authCheck,
		authCheckUser,
		[rules.addToCart, inputBodyValidator],
		cartController.addItemToCart
	);

module.exports = router;
