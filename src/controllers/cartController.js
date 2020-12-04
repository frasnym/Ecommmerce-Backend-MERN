const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");
const { errorManipulator } = require("../middlewares/api");

const addItemToCart = async (req, res) => {
	if (!req.body.product.match(/^[0-9a-fA-F]{24}$/)) {
		// Check if id is in valid format
		res.respMessage.message = req.t("ProductNotFound");
		return res.status(404).send(res.respMessage);
	}

	const product = await ProductModel.findById(req.body.product);
	if (!product) {
		// check if valid product
		res.respMessage.message = req.t("ProductNotFound");
		return res.status(404).send(res.respMessage);
	}

	let cart = await CartModel.findOne({ user: req.user._id });

	if (cart) {
		// cart found: update cart
		const cartIndex = cart.cartItems.findIndex((cartItem) => {
			return cartItem.product.toString() === req.body.product;
		});

		if (cartIndex !== -1) {
			// product found: add quantity
			cart.cartItems[cartIndex].quantity =
				cart.cartItems[cartIndex].quantity +
				(req.body.quantity ? req.body.quantity : 1);
		} else {
			// product not found: add more product
			cart.cartItems.push({
				product: product._id,
				quantity: req.body.quantity,
				price: product.price,
			});
		}
	} else {
		// cart not found: create new cart

		cart = new CartModel({
			user: req.user._id,
			cartItems: [
				{
					product: product._id,
					quantity: req.body.quantity,
					price: product.price,
				},
			],
		});
	}

	try {
		await cart.save();

		res.respMessage.data = cart;
		res.respMessage.success = true;
		res.respMessage.message = req.t("ProcessSuccess");
		return res.status(201).send(res.respMessage);
	} catch (e) {
		res.respMessage = errorManipulator(e, req, res.respMessage);
		return res.status(400).send(res.respMessage);
	}
};

module.exports = { addItemToCart };
