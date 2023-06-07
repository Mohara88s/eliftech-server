const { Order } = require("../../models");
const { NotFound } = require("http-errors");


const getAllOrdersByQuery = async (req, res, next) => {
	const { page = 1, limit = 20, email:notUpdatedEmail = "", phone = "" } = req.query;
	const skip = (page - 1) * limit;
	const email = notUpdatedEmail.toLowerCase()

	const querySt = (email.length) ? { "email": email } :
		{ "phone": { $regex: `${(phone[0] === ' ') ? phone.slice(1) : phone}`} }

	const orders = await Order.find(querySt)
		.populate({
		path: "shop",
		select: ["name"],
		})
		.populate("cart.good")
		.skip(skip)
		.limit(+limit);
	if (!orders.length) {
		throw new NotFound("No data by your query");
	}
	res.status(200).json({
		orders,
	});
};

module.exports = getAllOrdersByQuery;
