const express = require("express");

const { authCheckAdmin, authCheckUser } = require("../middlewares/auth");
const { upload, handleMulterErrors } = require("../middlewares/upload");
const { rules, inputBodyValidator } = require("../middlewares/validation");
const productController = require("../controllers/productController");

const router = new express.Router();

router
	.route("/")
	// .get(productController.readCategories)
	.post(
		authCheckUser,
		authCheckAdmin,
		upload.array("images"),
		[rules.createProduct, inputBodyValidator],
		productController.createProduct,
		handleMulterErrors
	);

module.exports = router;
