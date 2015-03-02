const RSS = require('rss');
const Post = require('../models/post');
const Term = require('../models/term');
const site = require('../configs/site');

const Feed = {
	generate: function(category, itemCount) {
		return Promise.all([
			Term.findOne({slug: category}).exec(), 
			Post.find({cat: category}).exec()])
		.then(result  => {
			cat = result[0];
			posts = result[1];
			var feed = new RSS({
				title: site.title + ' - ' + cat.title,
				description: cat.description,
				feed_url: site.url + 'feed/' + category + '/',
				site_url: site.url + category + '/',
				categories: [cat.title],
				author: site.author
			});
			posts.forEach(post => {
				feed.item({
					title: post.title,
					description: post.content, //TODO: Transform links to be absolute, maybe trim
					url: post.absoluteURI,
					guid: post._id,
					categories: post.terms,
					date: new Date(post.time),
				});
			});
			var xml = feed.xml({indent: true});
			return xml;
		}, err => {
			console.error('FEED ERROR: ', err)
			throw err;
		});
	}
}
	
module.exports = Feed;
