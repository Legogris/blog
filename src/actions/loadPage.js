'use strict';

var loadPosts = function(context, done) {
	return (err, posts) => {
		if(err || !posts) {
			console.log('errorpost', err);
		}
		//TODO: posts === [], then  404
		context.dispatch('LOAD_POSTS', {
			posts: posts
		});
		done();
	};
};

module.exports = {
	static: function(context, payload, done) {
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
		context.service.read('post', {year: payload.params.year}, {}, loadPosts(context, done))
	    //TODO: context.dispatch('UPDATE_PAGE_TITLE', payload.config.title);
	},
	cat: function(context, payload, done) {
		context.service.read('post', {cat: payload.params.cat}, {}, loadPosts(context, done))
	    //TODO: context.dispatch('UPDATE_PAGE_TITLE', payload.config.title);
	}
};
