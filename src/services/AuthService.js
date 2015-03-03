'use strict';

const debug = require('debug')('authservice');
const config = require('../configs/server.js');

function makeAuthURL(originalURL) {
	let g = config.google;
	let csrfToken = '122345t' //TODO: Fix
	let state = csrfToken + '_' + originalURL;
	return g.baseURI + '?client_id='+g.clientID+'&response_type=code&scope=openid%20email&redirect_uri='+g.redirectURI+'&state='+state+'&openid.realm=http://remerge.net';
 
}
module.exports = {
	name: 'auth',
	makeAuthURL: makeAuthURL,
	read: function(req, resource, params, config, cb) {
		console.log('AUTH SERVICE READ')
		let redirect = makeAuthURL(params.originalURL);
		cb(null, {redirect: redirect});
	}
};