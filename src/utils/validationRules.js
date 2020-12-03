const validator = require("validator");
const { body, header } = require("express-validator");

const signUp = [
	body("full_name").notEmpty().withMessage("ParameterValueRequired"),
	body("current_address").notEmpty().withMessage("ParameterValueRequired"),
	body("email_address").isEmail().withMessage("InvalidEmailAddressFormat"),
	body("phone_number").custom((value) => {
		if (!value.startsWith("62")) {
			// Check if start with "62" = (Indonesia Phone Code)
			throw new Error("InvalidPhoneNumberFormat");
		}
		return true; // Indicates the success of this synchronous custom validator
	}),
	body("password").notEmpty().withMessage("ParameterValueRequired"),
];

module.exports = {
	signUp,
};
