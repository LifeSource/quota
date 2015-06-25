var express = require("express"),
	bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser");

module.exports = function (config, app) {
	
	// middlewares
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// static assets
	switch (config.environment) {
		case "production":
			app.use("/", express.static(config.build));
			app.use("/", express.static(config.root));
			break;
		case "dev":
			app.use("/", express.static(config.client));
			app.use("/", express.static(config.root));
			break;	
		default:
			break;
	}
};
