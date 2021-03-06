'use strict';
const config = require('../configs/site');

var loadPosts = function(context, done) {
	return (err, result) => {
		let posts = result.posts;
		let cat = result.cat;
		let title = '';
		if(err || !posts) {
			console.log('errorpost', err);
		}
		//TODO: posts === [], then  404
		if(cat) {
			title += cat.title || cat;
		}
		else if(posts.length === 1) {
			title += posts[0].title;
		}
		if(title.length > 0) {
			title += ' - ';
		}
		title += config.title;
		let description = posts.length === 1 ? posts[0].description : config.description;
		context.dispatch('UPDATE_PAGE_TITLE', title);
		context.dispatch('UPDATE_PAGE_DESCRIPTION', description);
		context.dispatch('LOAD_USER', {
			user: result.user
		});
		context.dispatch('LOAD_POSTS', {
			posts: posts,
			cat: cat
		});
		done();
	};
};

module.exports = {
	static: function(context, payload, done) {
		//TODO: Check admin
		context.dispatch('UPDATE_PAGE_TITLE', 'Edit')
		if(!payload.config.create) {
			context.service.read('post', {slug: payload.params.slug}, {}, loadPosts(context, done));
		} else {
			done();
		}
	},
	page: function(context, payload, done) {
		context.service.read('page', {id: payload.config.page}, {}, function(err, page) {
			if (err || !page) {
				console.log('errorskates', err);
				return;
			}
		    context.dispatch('LOAD_PAGES', { pages: [page] });
		    done();
		});
	    context.dispatch('UPDATE_PAGE_TITLE', payload.config.title);
	},
	post: function(context, payload, done) {
		context.service.read('post', {slug: payload.params.slug}, {}, loadPosts(context, done));
	    //TODO: context.dispatch('UPDATE_PAGE_TITLE', payload.config.title);
	},
	year: function(context, payload, done) {
		context.service.read('post', {year: payload.params.year, cat: payload.params.cat, type: 'post'}, {}, loadPosts(context, done))
	    //TODO: context.dispatch('UPDATE_PAGE_TITLE', payload.config.title);
	},
	cat: function(context, payload, done) {
		console.log('ACTION')
		context.service.read('post', {cat: payload.params.cat, type: 'post' }, {}, loadPosts(context, done))
	    //TODO: context.dispatch('UPDATE_PAGE_TITLE', payload.config.title);
	},
	all: function(context, payload, done) {
		context.service.read('post', {type: 'post'}, {}, loadPosts(context, done))
	    //TODO: context.dispatch('UPDATE_PAGE_TITLE', payload.config.title);
	},
};
