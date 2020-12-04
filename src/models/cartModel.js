const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "ParameterValueRequired"],
		},
		cartItems: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: [true, "ParameterValueRequired"],
				},
				quantity: {
					type: Number,
					default: 1,
				},
				price: {
					type: Number,
					required: [true, "ParameterValueRequired"],
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Cart", cartSchema);
