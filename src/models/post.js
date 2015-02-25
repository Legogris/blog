const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	title: String,
	content: String,
	time: { type: Date, default: Date.now },
	terms: [String],
	cat: String,
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
postSchema.virtual('url').get(() => '/' + this.cat + '/' + this.time.getFullYear() + '/' + this.slug );

const Post = mongoose.model('Post', postSchema);

module.exports = Post;