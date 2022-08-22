const express = require("express");
const cors = require("cors");

const middlewares = [express.json(), express.urlencoded({ extended: true }), cors()];

module.exports = (app) => {
	app.use(middlewares);
};
