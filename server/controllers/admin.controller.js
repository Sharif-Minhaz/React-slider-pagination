const Card = require("../models/card.model");
const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyUser } = require("../middlewares/verifyUser");

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
	const authenticated = verifyUser(req, res, next);

	const { username, password } = req.body;

	if (authenticated) return res.status(200).json({ msg: "success", isAdmin: true });

	try {
		const admin = await Admin.findOne({ username });
		if (admin) {
			const match = await bcrypt.compare(password, admin.password);
			if (match) {
				const token = jwt.sign({ user: admin.username }, process.env.SECRET_KEY, {
					expiresIn: "1h",
				});
				res.cookie("auth", token, {
					httpOnly: true,
					expires: new Date(Date.now() + 3600000),
				});
				return res.status(200).json({ msg: "success", isAdmin: true });
			} else {
				return res.status(200).json({ msg: "failed", isAdmin: false });
			}
		}
		res.status(200).json({ msg: "failed", isAdmin: false });
	} catch (err) {
		next(err);
	}
};

exports.adminAddCardPostController = async (req, res, next) => {
	const card = new Card(req.body);
	const authenticated = verifyUser(req, res, next);
	if (authenticated) {
		try {
			const newCard = await card.save();
			res.status(201).json({ msg: "success", newCard });
		} catch (err) {
			next(err);
		}
	} else {
		res.status(200).json({ msg: "unauthorized" });
	}
};

exports.adminDelCardController = async (req, res, next) => {
	const { id } = req.params;
	const authenticated = verifyUser(req, res, next);
	if (authenticated) {
		try {
			const card = await Card.findByIdAndDelete(id);
			res.status(200).json(card);
		} catch (err) {
			next(err);
		}
	} else {
		res.status(403).json({ msg: "Not authorized." });
	}
};

exports.adminPutCardController = async (req, res, next) => {
	const { id } = req.params;
	const authenticated = verifyUser(req, res, next);
	if (authenticated) {
		try {
			const card = await Card.findByIdAndUpdate(id, { $set: req.body }, { new: true });
			res.status(200).json({ msg: "success", card });
		} catch (err) {
			next(err);
		}
	} else {
		res.status(200).json({ msg: "unauthorized." });
	}
};

exports.adminLogoutGetController = (req, res, next) => {
	const authenticated = verifyUser(req, res, next);
	if (authenticated) {
		res.clearCookie("auth");
		res.status(200).json({ msg: "success" });
	} else {
		res.status(200).json({ msg: "unauthorized." });
	}
};

exports.verifyAdmin = (req, res, next) => {
	const authenticated = verifyUser(req, res, next);
	authenticated
		? res.status(200).json({ isAdmin: true })
		: res.status(200).json({ isAdmin: false });
};
