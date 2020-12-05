const express = require("express");

const { authCheckAdmin, authCheck } = require("../middlewares/auth");
const { upload, handleMulterErrors } = require("../middlewares/upload");
const { rules, inputBodyValidator } = require("../middlewares/validation");
const categoryController = require("../controllers/categoryController");

const router = new express.Router();

router
	.route("/")
	.get(categoryController.readCategories)
	.post(
		authCheck,
		authCheckAdmin,
		upload.single("imageUrl"),
		[rules.createCategory, inputBodyValidator],
		categoryController.createCategory,
		handleMulterErrors
	);

module.exports = router;
