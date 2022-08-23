const Card = require("../models/card.model");

exports.getAllCardController = async (req, res, next) => {
	try {
		const cards = await Card.find();
		res.status(200).json(cards);
	} catch (err) {
		next(err);
	}
};
