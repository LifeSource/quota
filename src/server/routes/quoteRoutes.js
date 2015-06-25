var express = require("express");

module.exports = function (Quote) {
	
	var quoteRouter = express.Router();

	quoteRouter.route("/")
		.get(function (req, res) {
			Quote.find(function (err, quotes) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.json(quotes);
				}
			});
		});

	return quoteRouter;
};
