const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const middlewares = [
	cors({ origin: "http://localhost:3000", credentials: true }),
	express.json(),
	express.urlencoded({ extended: true }),
	cookieParser(),
];

module.exports = (app) => {
	app.use(middlewares);
};
