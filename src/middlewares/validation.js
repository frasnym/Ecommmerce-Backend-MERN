const validator = require("validator");
const { body, header, validationResult } = require("express-validator");

const rules = {
	signUp: [
		body("full_name").notEmpty().withMessage("ParameterValueRequired"),
		body("current_address")
			.notEmpty()
			.withMessage("ParameterValueRequired"),
		body("email_address")
			.isEmail()
			.withMessage("InvalidEmailAddressFormat"),
		body("phone_number").custom((value) => {
			if (!value.startsWith("62")) {
				// Check if start with "62" = (Indonesia Phone Code)
				throw new Error("InvalidPhoneNumberFormat");
			}
			return true; // Indicates the success of this synchronous custom validator
		}),
		body("password")
			.isLength({ min: 6 })
			.withMessage("ValueMustBeMinimum6Char"),
	],
	signIn: [
		header("user-agent").notEmpty().withMessage("ParameterValueRequired"),
		body("email_address")
			.isEmail()
			.withMessage("InvalidEmailAddressFormat"),
		body("password").notEmpty().withMessage("ParameterValueRequired"),
		body("ip_address").isIP().withMessage("InvalidIPAddressFormat"),
	],
	createCategory: [
		body("name").notEmpty().withMessage("ParameterValueRequired"),
	],
	createProduct: [
		body("name").notEmpty().withMessage("ParameterValueRequired"),
		body("price").notEmpty().withMessage("ParameterValueRequired"),
		body("quantity").notEmpty().withMessage("ParameterValueRequired"),
		body("description").notEmpty().withMessage("ParameterValueRequired"),
		body("category").notEmpty().withMessage("ParameterValueRequired"),
	],
	addToCart: [
		body("product").notEmpty().withMessage("ParameterValueRequired"),
	],
};

/**
 * Check if request body is breaking the validator rules
 * @param {Request} req : API Request parameter
 * @param {Response} res : API Response parameter
 * @param {Function} next : Next Function
 */
const inputBodyValidator = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorsArray = errors.array();
		res.respMessage.message = `${req.t(errorsArray[0].msg)}: ${req.t(
			errorsArray[0].param
		)}`;

		return res.status(400).send(res.respMessage);
	}
	next();
};

module.exports = {
	rules,
	inputBodyValidator,
};
