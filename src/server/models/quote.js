var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var quoteSchema = new Schema({
	source: { 
		type: String,
		required: true, 
		default: "Unknown"
	},
	message: { type: String, required: true },
	topic: { type: String }
});

module.exports = mongoose.model("Quote", quoteSchema);
