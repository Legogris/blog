const mongoose = require('mongoose');

const termSchema = mongoose.Schema({
	title: String,
	slug: {
		type: String,
		unique: true
	},
	description: String,
	theme: String
});

const Term = mongoose.model('Term', termSchema);

module.exports = Term;
