const Card = require("../models/card.model");
const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");

// exports.adminSignup = async (req, res, next) => {
// 	try {
// 		const saltRounds = 12;
// 		const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
// 		const admin = new Admin({
// 			username: req.body.username,
// 			password: hashedPass,
// 		});
// 		await admin.save();
// 		res.status(201).json({ msg: "Admin Created successfully!" });
// 	} catch (err) {
// 		next(err);
// 	}
// };

exports.adminLoginPostController = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const admin = await Admin.findOne({ username });
		if (admin) {
			const match = await bcrypt.compare(password, admin.password);
			if (match) {
				return res.status(200).json({ msg: "Login successful", isAdmin: true });
			} else {
				return res.status(404).json({ msg: "Login failed", isAdmin: false });
			}
		}
		res.status(404).json({ msg: "Login failed", isAdmin: false });
	} catch (err) {
		next(err);
	}
};

exports.adminAddCardPostController = async (req, res, next) => {
	const card = new Card(req.body);
	try {
		const newCard = await card.save();
		res.status(201).json(newCard);
	} catch (err) {
		next(err);
	}
};

exports.adminDelCardController = async (req, res, next) => {
	const { id } = req.params;
	try {
		const card = await Card.findByIdAndDelete(id);
		res.status(200).json(card);
	} catch (err) {
		next(err);
	}
};

exports.adminPutCardController = async (req, res, next) => {
	const { id } = req.params;
	try {
		const card = await Card.findByIdAndUpdate(id, { $set: req.body }, { new: true });
		res.status(200).json(card);
	} catch (err) {
		next(err);
	}
};
