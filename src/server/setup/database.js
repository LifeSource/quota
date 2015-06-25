var mongoose = require("mongoose"),
	Quote = require("../models/quote");
	seedData = require("../models/seedData")();

module.exports = function (config) {

	"use strict";

	mongoose.connect(config.database.connectionString);
	var	database = mongoose.connection;

	database.on("error", console.log.bind(console, "connection error:"));
	database.once("open", function (done) {
		console.log("Database connection opened ...");	
	});
	
	var seedDatabase = function () {
		
		var Quote = database.model("Quote");

		console.log("Seeding database ... ");

		Quote.find().exec(function (err, quotes) {
			if (quotes.length === 0) {
				database.collection("quotes").insert(seedData.quotes);
			}
		});

		console.log("Database seeded.");
	};

	seedDatabase();
};
