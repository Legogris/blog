'use strict';

const Post = require('../models/post');
const Term = require('../models/term');
const debug = require('debug')('postservice');
function callback(cb, req, result, err) {
	result.user =  req.session.user || null;
	cb(err || null, result);
}

module.exports = {
	name: 'post',
	read: function(req, resource, params, config, cb) {
		console.log('SERVICE READ')
		let query = {};
		Object.keys(params).forEach(key => {
			query[key] = params[key];
		});
		let done = data => {
			let posts = data[0];
			let cat = data[1];
			let result = {
				posts: posts.map(post => post.toObject()),
				cat: cat,
			};
			console.log('GOT IT')
			callback(cb, req, result);
		};
		let error = err => {
			console.error('ERROR', err);
			callback(cb, req, {posts: [], cat: {}}, err);
		};
		return Promise.all([
			Post.find(query).exec(),
			Term.findOne({slug: params.cat}).exec()])
		.then(done, error);
	},
	create: function(req, resource, post, body, config, cb) {
		console.log('USER')
		console.log(req.session);
		post.type = 'post';
		let done = (err, post) => {
			if(err) {
				console.log('create error', err);
				return;
			}
			console.log('post created: ')
			console.log(post);
			cb(null, post);
		}
		if(typeof post._id === 'undefined') {
			Post.create(post, done);
		} else {
			Post.update({_id: post.id}, post, done);
		}
	}
};