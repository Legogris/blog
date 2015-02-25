'use strict';

const Post = require('../models/post');
const debug = require('debug')('postservice');


var pages = {
	hej: {date: Date.now(), title: 'derp', content: ':D'},
	hopp: {
		date: Date.now(),
		title: 'EN TILL BLAWG',
		content: 'BLOGGELIblogg'
	}
};

module.exports = {
	name: 'post',
	read: function(req, resource, params, config, cb) {
		let query = {};
		Object.keys(params).forEach(key => {
			query[key] = params[key];
		});
		console.log(query)
		Post.where(query).find((err, posts) => {
			if(err) {
				console.log('ERROR');
				console.log(err);
				cb(null, []);
				return;
			}
			if(posts) {
				console.log('GOT IT')
				cb(null, posts.map(post => post.toObject()));
			}
		});
	},
	create: function(req, resource, post, body, config, cb) {
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