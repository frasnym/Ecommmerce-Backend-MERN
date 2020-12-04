const express = require("express");

const { authCheckAdmin } = require("../middlewares/auth");
const categoryController = require("../controllers/categoryController");
const router = new express.Router();

// router.post("/", categoryController.createCategory);
router
	.route("/")
	.post(authCheckAdmin, categoryController.createCategory)
	.get(categoryController.readCategories);

module.exports = router;
