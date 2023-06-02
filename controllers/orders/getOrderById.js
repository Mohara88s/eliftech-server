const { Order } = require("../../models");
const { NotFound } = require("http-errors");

const getOrderById = async (req, res) => {
	const { orderId } = req.params;

	const order = await Order.findById(orderId)
		.populate({
			path: "shop",
			select: ["name"],
		})
		.populate("cart.good")

	if (!order) {
		throw new NotFound(`Order with id=${orderId} not found`);
	}

	res.status(200).json({
		order,
	});
};
module.exports = getOrderById;
