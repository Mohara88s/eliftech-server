const { Shop, Good } = require("../../models");
const { NotFound } = require("http-errors");

const getAllShops = async (req, res, next) => {
	const shops = await Shop.find()
		.populate("goods")
	if (!shops.length) {
		throw new NotFound("There isn't any shop");
	}
	res.status(200).json({
		shops,
	});
};

module.exports = getAllShops;
