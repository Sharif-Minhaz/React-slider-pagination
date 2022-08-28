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
			type: Date,
			default: new Date(),
		},
	},
	{ timestamps: true }
);

module.exports = model("card", cardSchema);
