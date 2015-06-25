var express = require("express");

var config = require("../../config")();

var app = express();

// middleware
require("./setup/middleware")(config, app);

// database
require("./setup/database")(config);

// routes
require("./setup/routes")(config, app);

app.listen(config.port, function () {
	console.log("ENV = " + config.environment);
	console.log("PORT: " + config.port);
	console.log("Express started, listening on port: " + config.port);
});

