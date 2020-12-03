const UserModel = require("../models/userModel");

const signUp = (req, res) => {
	// const user = new UserModel(req.body); // Take all request body, and save it to User Model

	// 	try {
	// 		await user.save();

	// 		res.respMessage.success = true;
	// 		res.respMessage.message = req.t("ProcessSuccess");
	// 		return res.status(201).send(res.respMessage);
	// 	} catch (e) {
	// 		res.respMessage = api.errorManipulator(e, req, res.respMessage);
	// 		return res.status(400).send(res.respMessage);
	//     }
	res.respMessage.success = true;
	res.respMessage.message = req.t("ProcessSuccess");
	return res.status(201).send(res.respMessage);
};

module.exports = { signUp };
