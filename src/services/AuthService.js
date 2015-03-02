'use strict';

const debug = require('debug')('authservice');
const passport = require('passport');
const config = require('../configs/server.js');

function makeAuthURL() {
	let g = config.google;
	let csrfToken = '122345t' //TODO: Fix
	return g.baseURI + '?client_id='+g.clientID+'&response_type=code&scope=openid%20email&redirect_uri='+g.redirectURI+'&state='+csrfToken+'&openid.realm=http://remerge.net';
 
}
module.exports = {
	name: 'auth',
	read: function(req, resource, params, config, cb) {
		console.log('AUTH SERVICE READ')
		let redirect = makeAuthURL();
		console.log(redirect);
		cb(null, {redirect: redirect});
		return;
		passport.authenticate('local', (err, user, info) => {
			console.log('ohiduh')
			if(err) {
				console.log('err');
				cb(new Error('Login fail'));
				return;
			}
			if(!user) {
				console.log('no user');
				cb(new Error('Login fail: No user'));
				return;
			}
			console.log('xxx');
			console.log(req.logIn);
		});
		return;
		let query = {};
		Object.keys(params).forEach(key => {
			query[key] = params[key];
		});
		let done = data => {
			let posts = data[0];
			let cat = data[1];
			let result = {
				posts: posts.map(post => post.toObject()),
				cat: cat
			};
			console.log('GOT IT')
			cb(null, result);
		};
		let error = err => {
			console.error('ERROR', err);
			cb(null, {posts: [], cat: {}});
		};
		return Promise.all([
			Post.find(query).exec(),
			Term.findOne({slug: params.cat}).exec()])
		.then(done, error);
	}
};