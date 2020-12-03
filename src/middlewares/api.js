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

module.exports = {
	setResponseTemplate,
};
