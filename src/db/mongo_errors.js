const duplicate = (error) => {
	/**
	 * Uniqueness in Mongoose is not a validation parameter (like required); it tells Mongoose to create a unique index in MongoDB for that field
	 * You have to handle these errors yourself if you want to create custom error messages. The Mongoose documentation ("Error Handling Middleware") provides you with an example on how to create custom error handling:
	 * https://mongoosejs.com/docs/middleware.html#error-handling-middleware
	 */
	if (error.name === "MongoError" && error.code === 11000) {
		// console.log(error)
		// console.log(Object.keys(error.keyPattern).toString())
		return `ERRORMIDDLEWARE.DUPLICATE.${Object.keys(
			error.keyPattern
		).toString()}`;
	} else {
		return false;
	}
};

module.exports = duplicate;
