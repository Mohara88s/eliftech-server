const { Schema, model } = require("mongoose");
const Joi = require("joi");

const OrderSchema = Schema(
	{
		name: {
			type: String,
			required: [true, "Set the name"],
		},
		email: {
			type: String,
			required: [true, "Set the email"],
		},
		phone: {
			type: String,
			required: [true, "Set the phone"],
		},
		address: {
			type: String,
			required: [true, "Set the address"],
		},
		shop: {
			type: Schema.Types.ObjectId,
			ref: "Shop",
		},
		price: {
			type: Number,
			required: [true, "Set the price"],
		},
		cart: [
			{
				good: {
					type: Schema.Types.ObjectId,
					ref: "Good",
				},
				quantity: {
					type: Number,
					required: [true, "Set quntity"],
				},
			},
		],
	},
{ versionKey: false, timestamps: true }
);

const Order = model("Order", OrderSchema);

const joiSchema = Joi.object({
	name: Joi.string().required(),
});

module.exports = {
	Order,
	joiSchema,
};
