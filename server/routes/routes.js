const cardRoute = require("./card.route");
const adminRoute = require("./admin.route");

const routes = [
	{
		path: "/api/card/",
		handler: cardRoute,
	},
	{
		path: "/admin/",
		handler: adminRoute,
	},
];

module.exports = (app) => {
	routes.forEach((route) => {
		app.use(route.path, route.handler);
	});
};
