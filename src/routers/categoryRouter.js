const express = require("express");

const { authCheckAdmin, authCheck } = require("../middlewares/auth");
const { rules, inputBodyValidator } = require("../middlewares/validation");
const categoryController = require("../controllers/categoryController");

const router = new express.Router();

router
	.route("/")
	.get(categoryController.readCategories)
	.post(
		authCheck,
		authCheckAdmin,
		[rules.createCategory, inputBodyValidator],
		categoryController.createCategory
	);

module.exports = router;
