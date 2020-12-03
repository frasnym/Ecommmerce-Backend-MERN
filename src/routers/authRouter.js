const express = require("express");

const v = require("../utils/validationRules");
const { inputBodyValidator } = require("../middlewares/api");
const authController = require("../controllers/authController");

const router = new express.Router();

router.post("/signup", [v.signUp, inputBodyValidator], authController.signUp);

router.post("/signin", async (req, res) => {
	return res.status(200).send(res.respMessage);
});

module.exports = router;
