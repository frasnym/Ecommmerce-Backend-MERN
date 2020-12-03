const express = require("express");

const router = new express.Router();

router.post("/signup", (req, res) => {
	res.status(200).json({
		message: req.body,
	});
});

router.post("/signin", (req, res) => {
	res.status(200).json({
		message: req.body,
	});
});

module.exports = router;
