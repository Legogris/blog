'use strict';

const createStore = require('fluxible/utils/createStore');

const AuthStore = createStore({
	storeName: 'AuthStore',
	handlers: {
		'CHANGE_ROUTE_START': 'onNavigate'
	},
	initialize: function() {
		console.log('store init', arguments);
	},
	onNavigate: function(payload) {
		if(payload.config.admin) {
			console.log('HEEEEJ')
		}
		return payload.action
	},
	dehydrate: function() {
		console.log('dehydrate');
	},
	hydrate: function() {
		console.log('hydrate');
	}
});

module.exports = AuthStore;
