'use strict';

const createStore = require('fluxible/utils/createStore');
function getAnonymousUser() {
	return {username: '', admin: false};
}
const AuthStore = createStore({
	storeName: 'AuthStore',
	handlers: {
		'LOAD_USER': 'onUser'
	},
	initialize: function() {
		this.user = typeof window !== 'undefined' ? 
			(window.App.user || getAnonymousUser()) :
			getAnonymousUser();
	},
	onUser: function(payload) {
		let oldUser = this.user;
		this.user = payload.user || getAnonymousUser();
		if(this.user.username !== oldUser.username ||
		   this.user.admin !== oldUser.admin) {
			this.emitChange();
		}
	},
	getUser: function() {
		return this.user;
	},
	dehydrate: function() {
		console.log('dehydrate');
		return {
			user: this.user
		}
	},
	hydrate: function(state) {
		console.log('hydrate');
		this.user = state.user;
	}
});

module.exports = AuthStore;
