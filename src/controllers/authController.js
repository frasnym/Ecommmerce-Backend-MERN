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

		const data = {
			_id: user._id,
			full_name: user.full_name,
			current_address: user.current_address,
			email_address: user.email_address,
			phone_number: user.phone_number,
			account_status: user.account_status,
			email_address_verify_status: user.email_address_verify_status,
			phone_number_verify_status: user.phone_number_verify_status,
			role: user.role,
		};

		res.respMessage.data = data;
		res.respMessage.token = token;
		res.respMessage.success = true;
		res.respMessage.message = req.t("ProcessSuccess");
		return res.status(200).send(res.respMessage);
	} catch (e) {
		res.respMessage = errorManipulator(e, req, res.respMessage);
		return res.status(404).send(res.respMessage);
	}
};

module.exports = { signUp, signIn };
