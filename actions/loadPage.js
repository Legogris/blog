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
	dynamic: function(context, payload, done) {
	    context.dispatch('LOAD_PAGE', {
	        id: payload.params.title
	    });
	    context.dispatch('UPDATE_PAGE_TITLE', {
	        pageTitle: payload.config.title
	    });
	    done();
	},
	post: function(context, payload, done) {
		context.service.read('post', {slug: payload.params.slug}, {}, loadPosts(context, done));
	},
	year: function(context, payload, done) {
		context.service.read('post', {year: payload.params.year}, {}, loadPosts(context, done))
	}
};
