const { model, Schema } = require("mongoose");

const cardSchema = new Schema(
	{
		img: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		des: {
			type: String,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("card", cardSchema);
