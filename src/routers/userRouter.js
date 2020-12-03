const express = require("express");

const User = require("../models/userModel");

const router = new express.Router();

router.post("/signup", (req, res) => {
	res.status(200).json({
		message: req.body,
	});
});

router.post("/signin", async (req, res) => {
	return res.status(200).send(res.respMessage);
});

module.exports = router;
