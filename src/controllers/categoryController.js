const fs = require("fs");
const slugify = require("slugify");

const categoryModel = require("../models/categoryModel");
const { errorManipulator } = require("../middlewares/api");

/**
 * Populate Categories Children
 * @param {Object} categories : category object from db
 * @param {String} parentId : ObjectId, if available
 */
function populateCategories(categories, parentId = null) {
	const categoryList = [];
	let category;

	if (parentId == null) {
		category = categories.filter((cat) => cat.parentId == undefined);
	} else {
		category = categories.filter((cat) => cat.parentId == parentId);
	}

	for (let cate of category) {
		categoryList.push({
			_id: cate._id,
			name: cate.name,
			slug: cate.slug,
			imageUrl: cate.imageUrl,
			children: populateCategories(categories, cate._id),
		});
	}

	return categoryList;
}

const createCategory = async (req, res) => {
	let imageUrl;
	if (req.file) {
		imageUrl = req.file.filename;
	}

	const categoryObj = {
		name: req.body.name,
		slug: slugify(req.body.name), // slugify some string
		imageUrl,
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
		if (req.file) {
			fs.unlink(req.file.path, (err) => {
				// delete the image
				if (err) throw err;
			});
		}
		res.respMessage = errorManipulator(e, req, res.respMessage);
		return res.status(400).send(res.respMessage);
	}
};

const readCategories = async (req, res) => {
	try {
		const categories = await categoryModel.find({});

		res.respMessage.data = populateCategories(categories);

		res.respMessage.success = true;
		res.respMessage.message = "Success";
		res.status(200).send(res.respMessage);
	} catch (e) {
		res.respMessage = errorManipulator(e, req, res.respMessage);
		res.status(404).send(res.respMessage);
	}
};

module.exports = { createCategory, readCategories };
