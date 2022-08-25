const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const middlewares = [
	express.json(),
	express.urlencoded({ extended: true }),
	cors({ credentials: true }),
	cookieParser(),
];

module.exports = (app) => {
	app.use(middlewares);
};
