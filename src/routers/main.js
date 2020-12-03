const express = require("express");

const router = new express.Router();

router.get("/", (req, res) => {
	res.status(200).json({
		message: "Hello",
	});
});

router.post("/", (req, res) => {
	res.status(200).json({
		message: req.body,
	});
});

module.exports = router;
