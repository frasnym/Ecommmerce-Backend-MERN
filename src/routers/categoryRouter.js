const express = require("express");

const { authCheckAdmin, authCheckUser } = require("../middlewares/auth");
const categoryController = require("../controllers/categoryController");
const router = new express.Router();

// router.post("/", categoryController.createCategory);
router
	.route("/")
	.post(authCheckUser, authCheckAdmin, categoryController.createCategory)
	.get(categoryController.readCategories);

module.exports = router;
