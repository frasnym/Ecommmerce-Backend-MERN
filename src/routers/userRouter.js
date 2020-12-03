const express = require("express");

const v = require("../utils/validationRules");
const { inputBodyValidator } = require("../middlewares/api");
const UserController = require("../controllers/userController");

const router = new express.Router();

router.post("/signup", [v.signUp, inputBodyValidator], UserController.signUp);

router.post("/signin", async (req, res) => {
	return res.status(200).send(res.respMessage);
});

module.exports = router;
