const express = require("express");

const { authCheckAdmin, authCheck } = require("../middlewares/auth");
const { upload, handleMulterErrors } = require("../middlewares/upload");
const { rules, inputBodyValidator } = require("../middlewares/validation");
const productController = require("../controllers/productController");

const router = new express.Router();

router
	.route("/")
	.get(productController.readProducts)
	.post(
		authCheck,
		authCheckAdmin,
		upload.array("images"),
		[rules.createProduct, inputBodyValidator],
		productController.createProduct,
		handleMulterErrors
	);

module.exports = router;
