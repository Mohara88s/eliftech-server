const { Order} = require("../../models");
const { BadRequest} = require("http-errors");

const addOrder = async (req, res, next) => {
	const { name, email:notUpdatedEmail, phone, address, shop, price, cart } = req.body;
	if (!name) {
		throw new BadRequest("The name is required");
	}
	if (!notUpdatedEmail) {
		throw new BadRequest("The email is required");
	}
	if (!phone) {
		throw new BadRequest("The phone is required");
	}
	if (!address) {
		throw new BadRequest("The address is required");
	}
	if (!shop) {
		throw new BadRequest("The shop is required");
	}
	if (!price) {
		throw new BadRequest("The price is required");
	}
	if (!cart.length) {
		throw new BadRequest("No goods in cart");
	}
	const email = notUpdatedEmail.toLowerCase()
	const newOrder = new Order({
		name, email, phone, address, shop, price, cart 
	});
	await newOrder.save();
	const createdOrder = await Order.findById(newOrder._id)
	.populate({
		path: "shop",
		select: ["name"],
	})
	.populate("cart.good")
	
	res.status(200).json({
		order:createdOrder,
	});
};

module.exports = addOrder;
