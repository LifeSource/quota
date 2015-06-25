
module.exports = function (config, app) {

	var Quote = require("../models/quote");
	
	var quoteRouter = require("../routes/quoteRoutes")(Quote);

	app.use("/api/quotes", quoteRouter);	
};
