const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

userSchema.statics = {
	/**
	 * To lookup user data by it's email & password, preferable for login
	 * @param {String} email_address : User's email from request body
	 * @param {String} password : User's password from request body
	 */
	findbyCredentials: async (email_address, password) => {
		// const user = await User.findOne({ email_address:email_address })
		const user = await User.findOne({
			email_address,
			account_status: "ACTIVE",
		}); // Find user with email_address and account_status

		if (!user) {
			throw new Error("ERRORMIDDLEWARE.LOGIN.");
		}

		const isMatch = await bcrypt.compare(password, user.password); // Check password with hash
		if (!isMatch) {
			throw new Error("ERRORMIDDLEWARE.LOGIN.");
		}

		return user;
	},
};

const User = mongoose.model("User", userSchema);

module.exports = User;
