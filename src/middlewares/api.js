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
 * Manipulating Error Message Before send to Consumer
 * @param {Error} error : Error Object from "throw new Error()"
 * @param {Request} req : API Request parameter
 * @param {Object} respMessage : Response message template
 */
const errorManipulator = (error, req, respMessage) => {
	if (error.message.startsWith("ERRORMIDDLEWARE")) {
		respMessage.message = error.message.replace("ERRORMIDDLEWARE.", "");
		if (respMessage.message.startsWith("DUPLICATE")) {
			respMessage.message = respMessage.message.replace(
				"DUPLICATE.",
				req.t("DataRegisteredPleaseProvideAnotherValue")
			);
		} else if (respMessage.message.startsWith("LOGIN")) {
			respMessage.message = respMessage.message.replace(
				"LOGIN.",
				req.t("UnableToLogin")
			);
		}
	} else {
		// for (const [key, value] of Object.entries(error.errors)) {
		//     respMessage.message = respMessage.message.concat(`${req.t(value)}: ${req.t(key)}`);
		//     break;
		// }
	}

	if (process.env.NODE_ENV !== "production") {
		console.log(error);
		respMessage.helper = error;
	}

	return respMessage;
};

module.exports = {
	setResponseTemplate,
	errorManipulator,
};
