const UserModel = require("../models/userModel");
const { errorManipulator } = require("../middlewares/api");

const signUp = async (req, res) => {
	const {
		full_name,
		current_address,
		email_address,
		phone_number,
		password,
	} = req.body; // Destructure
	const user = new UserModel({
		full_name,
		current_address,
		email_address,
		phone_number,
		password,
		role: "USER",
	});

	try {
		await user.save();

		res.respMessage.success = true;
		res.respMessage.message = req.t("ProcessSuccess");
		return res.status(201).send(res.respMessage);
	} catch (e) {
		res.respMessage = errorManipulator(e, req, res.respMessage);
		return res.status(400).send(res.respMessage);
	}
};

const signIn = async (req, res) => {
	try {
		const user = await UserModel.findbyCredentials(
			req.body.email_address,
			req.body.password
		);
		const token = await user.generateAuthToken(
			req.get("User-Agent"),
			req.body.ip_address
		);

		res.respMessage.success = true;
		res.respMessage.message = req.t("ProcessSuccess");
		res.respMessage.data = user;
		res.respMessage.token = token;
		return res.status(200).send(res.respMessage);
	} catch (e) {
		res.respMessage = errorManipulator(e, req, res.respMessage);
		return res.status(404).send(res.respMessage);
	}
};

module.exports = { signUp, signIn };
