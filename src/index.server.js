const express = require("express");
const env = require("dotenv");
const app = express();

env.config();

app.get("/", (req, res) => {
	res.status(200);
});

app.listen(process.env.PORT, () => {
	console.log("Server run on port:", process.env.PORT);
});
