const express = require("express");

const User = require("../models/userModel");

const router = new express.Router();

router.post("/signup", (req, res) => {
	res.respMessage.success = true;
	res.respMessage.message = req.t("ProcessSuccess");
	return res.status(201).send(res.respMessage);
});

router.post("/signin", async (req, res) => {
	return res.status(200).send(res.respMessage);
});

module.exports = router;
