const mongoose = require("mongoose");
const mongo_errors = require("../db/mongo_errors");

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "ParameterValueRequired"],
			trim: true,
		},
		slug: {
			type: String,
			required: [true, "ParameterValueRequired"],
			trim: true,
			unique: true,
		},
		parentId: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

categorySchema.post("save", function (error, doc, next) {
	const mongoErr = mongo_errors(error);
	if (mongoErr) {
		next(new Error(mongoErr));
	} else {
		next();
	}
});

module.exports = mongoose.model("Category", categorySchema);
