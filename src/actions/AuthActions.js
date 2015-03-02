'use strict';

const AuthActions = {
	login: function(context, payload, done) {
		context.service.read('auth', payload, {}, function(err, result) {
			//TODO: agnosticism
			window.location = result.redirect;

			if(err) {
				console.log('Error in AuthActions.login: ', err)
			}
			done(post);
		});
	}
};

module.exports = AuthActions;