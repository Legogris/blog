'use strict';

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
		context.service.read('post', payload.params, {}, function(err, post) {
			if(err || !post) {
				console.log('errorpost', err);
			}
			context.dispatch('LOAD_POSTS', {
				posts: [post]
			});
			done();
		});
	}
};
