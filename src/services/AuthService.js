'use strict';

const debug = require('debug')('authservice');
const config = require('../configs/server.js');

function callback(cb, req, result, err) {
	result.user = req.session.user || null;
	cb(err || null, result);
}

function makeAuthURL(originalURL) {
	let g = config.google;
	let csrfToken = '122345t' //TODO: Fix
	let state = csrfToken + '_' + originalURL;
	return g.baseURI + '?client_id='+g.clientID+'&response_type=code&scope=openid%20email&redirect_uri='+g.redirectURI+'&state='+state+'&openid.realm='+g.realm;
 
}
module.exports = {
	name: 'auth',
	makeAuthURL: makeAuthURL,
	read: function(req, resource, params, config, cb) {
		//console.log('AUTH SERVICE READ')
		let redirect = makeAuthURL(params.originalURL);
		callback(cb, req, {redirect: redirect});
		//cb(null, {redirect: redirect});
	},
	ping: function(req, resource, params, config, cb) {
		callback(cb, req, {});
	}
};