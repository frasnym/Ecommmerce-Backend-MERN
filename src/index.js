const env = require("dotenv");

const app = require("./app");

env.config();

const port = process.env.PORT;
app.listen(port, () => {
	console.log("Server is up on port:", port);
});
