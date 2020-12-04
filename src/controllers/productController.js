const fs = require("fs");
const slugify = require("slugify");

const productModel = require("../models/productModel");
const { errorManipulator } = require("../middlewares/api");

const createProduct = async (req, res) => {
	const { name, price, description, category, quantity } = req.body;

	let images = [];
	if (req.files.length > 0) {
		images = req.files.map((file) => {
			return { url: file.filename };
		});
	}

	const product = new productModel({
		name,
		slug: slugify(name),
		price,
		quantity,
		description,
		category,
		images,
		createdBy: req.user._id,
	});

	try {
		await product.save();

		res.respMessage.data = product;
		res.respMessage.success = true;
		res.respMessage.message = req.t("ProcessSuccess");
		return res.status(201).send(res.respMessage);
	} catch (e) {
		req.files.forEach((file) => {
			// foreach uploaded image
			fs.unlink(file.path, (err) => {
				// delete the image
				if (err) throw err;
			});
		});
		res.respMessage = errorManipulator(e, req, res.respMessage);
		return res.status(400).send(res.respMessage);
	}
};

const readProducts = async (req, res) => {
	try {
		const products = await productModel.find({});

		res.respMessage.data = products;

		res.respMessage.success = true;
		res.respMessage.message = "Success";
		res.status(200).send(res.respMessage);
	} catch (e) {
		res.respMessage = errorManipulator(e, req, res.respMessage);
		res.status(404).send(res.respMessage);
	}
};

module.exports = { createProduct, readProducts };
