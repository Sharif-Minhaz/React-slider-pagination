const Card = require("../models/card.model");

exports.addCardPostController = async (req, res, next) => {
	const card = new Card(req.body);
	try {
		const newCard = await card.save();
		res.status(201).json(newCard);
	} catch (err) {
		next(err);
	}
};

exports.getAllCardController = async (req, res, next) => {
	try {
		const cards = await Card.find();
		res.status(200).json(cards);
	} catch (err) {
		next(err);
	}
};
