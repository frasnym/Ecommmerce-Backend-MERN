const { validationResult } = require("express-validator");

/**
 * Creating template message for response
 * @param {Request} req : API Request parameter
 * @param {Response} res : API Response parameter
 * @param {Function} next : Next Function
 */
const setResponseTemplate = async (req, res, next) => {
	res.respMessage = {
		success: false,
		message: "",
	};
	next();
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
	setResponseTemplate,
	inputBodyValidator,
};
