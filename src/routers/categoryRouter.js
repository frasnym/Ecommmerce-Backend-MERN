const express = require("express");

const categoryController = require("../controllers/categoryController");
const router = new express.Router();

// router.post("/", categoryController.createCategory);
router
	.route("/")
	.post(categoryController.createCategory)
	.get(categoryController.readCategories);

module.exports = router;
