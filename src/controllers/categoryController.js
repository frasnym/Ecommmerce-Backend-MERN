const slugify = require("slugify");

const categoryModel = require("../models/categoryModel");
const { errorManipulator } = require("../middlewares/api");

const createCategory = async (req, res) => {
	const categoryObj = {
		name: req.body.name,
		slug: slugify(req.body.name), // slugify some string
	};

	if (req.body.parentId) {
		// check if parentId available
		categoryObj.parentId = req.body.parentId;
	}

	const category = new categoryModel(categoryObj);

	try {
		await category.save();

		res.respMessage.data = category;
		res.respMessage.success = true;
		res.respMessage.message = req.t("ProcessSuccess");
		return res.status(201).send(res.respMessage);
	} catch (e) {
		res.respMessage = errorManipulator(e, req, res.respMessage);
		return res.status(400).send(res.respMessage);
	}
};

module.exports = { createCategory };
