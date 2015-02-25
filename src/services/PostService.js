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
		let query = {terms: []};
		Object.keys(params).forEach(key => {
			if(key === 'cat') {
				query.terms.push(params[key]);
			} else {
				query[key] = params[key];
			}
		});
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
	create: function(req, resource, params, body, config, cb) {
		Post.create({terms: ['food'], slug: 'hello', title: 'Hello Mongoose', content: 'ERMAHGERDD'}, (err, post) => {
			if(err) {
				console.log('create error', err);
				return;
			}
			console.log('post created: ')
			console.log(post);
			cb(null, post);
		})
	}
};