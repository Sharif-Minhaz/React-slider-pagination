exports.adminValidator = (req, res, next) => {
	const { username, password } = req.body;

	const error = {};
	error.username = username ? "" : "username is required";
	error.password = password ? "" : "password is required";

	if (error.username || error.password) {
		return res.status(200).json({ msg: "invalid", isAdmin: false, error });
	} else {
		next();
	}
};
