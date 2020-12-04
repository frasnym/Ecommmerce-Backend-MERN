const express = require("express");
const multer = require("multer");
const shortid = require("shortid");

const { authCheckAdmin, authCheckUser } = require("../middlewares/auth");
const { rules, inputBodyValidator } = require("../middlewares/validation");
const productController = require("../controllers/productController");

const router = new express.Router();
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// file upload directory
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		// file name
		cb(null, shortid.generate() + "-" + file.originalname);
	},
});
const upload = multer({
	storage: storage,
	limits: {
		// TODO Error Message not handled yet
		fileSize: 1000000, // 1 mb
	},
	fileFilter(req, file, cb) {
		// Check with Regex
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error("InvalidImageFile"));
		}

		// Continue Upload
		return cb(undefined, true);
	},
});
const handleMulterErrors = (error, req, res, next) => {
	res.respMessage.message = req.t(error.message);
	return res.status(400).send(res.respMessage);
};

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
