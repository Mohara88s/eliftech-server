const { Schema, model } = require("mongoose");
const Joi = require("joi");

const ShopSchema = Schema(
	{	
		name: {
			type: String,
			required: [true, "Set the shop title in English"],
			unique: true,
		},
		goods: [
			{
				type: Schema.Types.ObjectId,
				ref: "Good",
			},
		],
	},
	{ versionKey: false, timestamps: true }
);

const Shop = model("Shop", ShopSchema);

const joiSchema = Joi.object({
	name: Joi.string().required(),
});

module.exports = {
	Shop,
	joiSchema,
};
