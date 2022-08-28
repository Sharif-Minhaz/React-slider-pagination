exports.cardValidator = (req, res, next) => {
	const { img, title, des } = req.body;

	const error = {};
	error.img = img ? "" : "image is required";
	error.title = title ? "" : "title is required";
	error.des = des ? "" : "description is required";

	if (error.img || error.title || error.des) {
		return res.status(200).json({ msg: "invalid", error });
	}

	next();
};
