const mongoose = require("mongoose");
const mongo_errors = require("../db/mongo_errors");

const productSchema = new mongoose.Schema(
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
		price: {
			type: Number,
			required: [true, "ParameterValueRequired"],
		},
		quantity: {
			type: Number,
			required: [true, "ParameterValueRequired"],
		},
		description: {
			type: String,
			required: [true, "ParameterValueRequired"],
			trim: true,
		},
		offer: {
			type: Number,
		},
		images: [
			{
				url: {
					type: String,
				},
			},
		],
		reviews: [
			{
				userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
				review: { type: String },
			},
		],
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: [true, "ParameterValueRequired"],
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "ParameterValueRequired"],
		},
	},
	{
		timestamps: true,
	}
);

/**
 * Change Images URL to Full URL with BASE_URL
 */
productSchema
	.path("images")
	.schema.virtual("full_url")
	.get(function () {
		return `${process.env.BASE_URL}/${this.url}`;
	});

productSchema.methods = {
	/**
	 ** Hide credentials data on API response
	 */
	toJSON: function () {
		const product = this;
		const productObject = product.toObject({ virtuals: true });

		productObject.images.map((image) => {
			delete image.id;
			delete image.url;
		});

		delete productObject.id;
		delete productObject.images.id;

		return productObject;
	},
};

productSchema.post("save", function (error, doc, next) {
	const mongoErr = mongo_errors(error);
	if (mongoErr) {
		next(new Error(mongoErr));
	} else {
		next();
	}
});

module.exports = mongoose.model("Product", productSchema);
