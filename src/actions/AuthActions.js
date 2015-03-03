'use strict';

const AuthActions = {
	login: function(context, payload, done) {
		context.service.read('auth', payload, {}, function(err, result) {
			//This should only be ran from client
			if(err) {
				console.log('Error in AuthActions.login: ', err)
				//Show error
			} else if(typeof window !== 'undefined') {
				window.location = result.redirect;
			}

			done();
		});
	}
};

module.exports = AuthActions;