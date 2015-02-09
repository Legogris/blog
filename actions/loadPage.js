'use strict';

module.exports = {
	static: function(context, payload, done) {
		context.service.read('page', {id: payload.config.page}, {}, function(err, page) {
			if (err || !page) {
				console.log('errorskates', err);
				return;
			}
		    context.dispatch('LOAD_PAGES', {
		        id: payload.config.page,
		        pages: [page]
		    });
		});
	    context.dispatch('UPDATE_PAGE_TITLE', payload.config.title);
	    done();
	},
	dynamic: function(context, payload, done) {
	    context.dispatch('LOAD_PAGE', {
	        id: payload.params.title
	    });
	    context.dispatch('UPDATE_PAGE_TITLE', {
	        pageTitle: payload.config.title
	    });
	    done();
	}
};
