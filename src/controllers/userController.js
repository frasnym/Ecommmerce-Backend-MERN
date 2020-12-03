// const UserModel = require("../models/userModel");
// const { errorManipulator } = require("../middlewares/api");

const getUser = async (req, res) => {
	const data = {
		_id: req.user._id,
		full_name: req.user.full_name,
		current_address: req.user.current_address,
		email_address: req.user.email_address,
		phone_number: req.user.phone_number,
		account_status: req.user.account_status,
		email_address_verify_status: req.user.email_address_verify_status,
		phone_number_verify_status: req.user.phone_number_verify_status,
		role: req.user.role,
	};

	res.respMessage.data = data;
	res.respMessage.success = true;
	res.respMessage.message = req.t("ProcessSuccess");
	return res.status(200).send(res.respMessage);
};

module.exports = { getUser };
