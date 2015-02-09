'use strict';

module.exports = {
	static: function(context, payload, done) {
	    context.dispatch('LOAD_PAGE', {
	        id: payload.config.page
	    });
	    context.dispatch('UPDATE_PAGE_TITLE', {
	        pageTitle: payload.config.title
	    });
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
