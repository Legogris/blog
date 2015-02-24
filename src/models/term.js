const mongoose = require('mongoose');

const termSchema = mongoose.Schema({
	title: String,
	slug: String,
	description: String,
	theme: String
});