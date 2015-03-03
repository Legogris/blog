'use strict';

const createStore = require('fluxible/utils/createStore');

const AuthStore = createStore({
	storeName: 'AuthStore',
	handlers: {
		'LOAD_USER': 'onUser'
	},
	initialize: function() {
		console.log('store init', arguments);
		this.user = {username: '', admin: false};
	},
	onUser: function(payload) {
		let oldUser = this.user;
		this.user = payload.user || {username: '', admin: false}
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
