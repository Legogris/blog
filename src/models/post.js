const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	title: String,
	content: String,
	date: { type: Date, default: Date.now },
	terms: [String],
	public: {
		type: Boolean,
		default: true
	},
	slug: String,
	type: {
		type: String,
		enum: { values: ['page', 'post'] },
	}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;