const fs = require("fs");
const slugify = require("slugify");

const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
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
		const products = await productModel
			.find({})
			.populate({ path: "category", select: "_id name" });
		res.respMessage.data = products;

		res.respMessage.success = true;
		res.respMessage.message = req.t("ProcessSuccess");
		return res.status(200).send(res.respMessage);
	} catch (e) {
		console.log(e);
		res.respMessage = errorManipulator(e, req, res.respMessage);
		return res.status(404).send(res.respMessage);
	}
};

const readProductsBySlug = async (req, res) => {
	try {
		const { slug } = req.params;
		const category = await categoryModel.findOne({ slug }).select("_id");
		if (!category) {
			res.respMessage.message = req.t("ProductNotFound");
			return res.status(404).send(res.respMessage);
		}

		const products = await productModel.find({ category: category._id });

		res.respMessage.data = {
			products,
			productsByPrice: {
				under20m: products.filter(
					(product) => product.price <= 20000000
				),
				under15m: products.filter(
					(product) => product.price <= 15000000
				),
				under10m: products.filter(
					(product) => product.price <= 10000000
				),
			},
		};
		res.respMessage.success = true;
		res.respMessage.message = req.t("ProcessSuccess");
		return res.status(200).send(res.respMessage);
	} catch (e) {
		res.respMessage = errorManipulator(e, req, res.respMessage);
		return res.status(404).send(res.respMessage);
	}
};

module.exports = { createProduct, readProducts, readProductsBySlug };
