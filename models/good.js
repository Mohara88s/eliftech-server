const { Schema, model } = require("mongoose");
const Joi = require("joi");

const GoodSchema = Schema(
	{	
		name: {
			type: String,
			required: [true, "Set the good title in English"],
		},
		price: {
			type: Number,
			required: [true, "Set the good price"],
		},
		picture: {
			type: String,
			required: [true, "Set the link for the picture"],
		},
	},
	{ versionKey: false, timestamps: true }
);

const Good = model("Good", GoodSchema);

const joiSchema = Joi.object({
	name: Joi.string().required(),
	price: Joi.number().required(),
});

module.exports = {
	Good,
	joiSchema,
};
// 