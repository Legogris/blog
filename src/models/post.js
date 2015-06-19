const mongoose = require('mongoose');
const config = require('../configs/site.js');

const postSchema = mongoose.Schema({
	title: String,
	content: String,
	time: { type: Date, default: Date.now },
	terms: [String],
	cat: String,
	hackerNewsID: { type: Number, default: 0},
	public: {
		type: Boolean,
		default: true
	},
	slug: {
		type: String,
		unique: true
	},
	type: {
		type: String,
		enum: { values: ['page', 'post'] },
	}
});

postSchema.set('toObject', {
	getters: true,
	transform: (doc, ret, options) => {
    	ret.date = new Date(doc.time).toISOString().substring(0,10);
    	delete ret.time;
    	return ret;
	}
});
postSchema.virtual('uri').get(() => '/' + this.cat + '/' + this.time.getFullYear() + '/' + this.slug );
postSchema.virtual('absoluteURI').get(() => config.url + this.uri);
postSchema.virtual('description').get(() => this.content.slice(0, config.descriptionLength) + '[...]');

const Post = mongoose.model('Post', postSchema);

module.exports = Post;