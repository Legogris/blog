'use strict';

const AuthActions = {
	login: function(context, payload, done) {
		context.service.read('auth', payload, {}, function(err, result) {
			//TODO: agnosticism
			if(err) {
				console.log('Error in AuthActions.login: ', err)
				//Show error
			} else {
				window.location = result.redirect;
			}

			done();
		});
	}
};

module.exports = AuthActions;