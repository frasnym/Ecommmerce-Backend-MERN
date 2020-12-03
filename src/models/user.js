const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
	{
		full_name: {
			type: String,
			required: [true, "ParameterValueRequired"],
			trim: true,
			min: 3,
		},
		current_address: {
			type: String,
			required: [true, "ParameterValueRequired"],
			trim: true,
		},
		account_status: {
			type: String,
			required: [true, "ParameterValueRequired"],
			uppercase: true,
			enum: ["ACTIVE", "INACTIVE"],
			default: "ACTIVE",
		},
		email_address: {
			type: String,
			unique: true,
			required: [true, "ParameterValueRequired"],
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("InvalidEmailAddressFormat");
				}
			},
		},
		email_address_verify_status: {
			type: String,
			required: [true, "ParameterValueRequired"],
			uppercase: true,
			enum: ["UNVERIFIED", "VERIFIED"],
			default: "UNVERIFIED",
		},
		phone_number: {
			type: String,
			unique: true,
			required: [true, "ParameterValueRequired"],
			trim: true,
		},
		phone_number_verify_status: {
			type: String,
			required: [true, "ParameterValueRequired"],
			uppercase: true,
			enum: ["UNVERIFIED", "VERIFIED"],
			default: "UNVERIFIED",
		},
		password: {
			type: String,
			required: true,
			minlength: 7,
			trim: true,
		},
		role: {
			type: String,
			required: true,
			uppercase: true,
			enum: ["USER", "ADMIN"],
		},
		profile_picture: {
			type: String,
		},
		tokens: [
			{
				token: {
					type: String,
					required: [true, "ParameterValueRequired"],
				},
				user_agent: {
					type: String,
					required: [true, "ParameterValueRequired"],
				},
				ip_address: {
					type: String,
					required: [true, "ParameterValueRequired"],
					validate(value) {
						if (!validator.isIP(value)) {
							throw new Error("InvalidIPAddressFormat");
						}
					},
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
