const UserModel = require("../models/userModel");

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
		res.respMessage.message = e.message;
		return res.status(400).send(res.respMessage);
	}
};

module.exports = { signUp };
