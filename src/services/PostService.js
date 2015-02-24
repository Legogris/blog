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
		var data = [];
		const query = {
			slug: params.slug
		};
		Post.find(query).exec().then(post => {
			console.log('GOT IT')
			console.log(post);
		}, (err) => {
			console.log('ERROR');
			console.log(err);
		});

		if(typeof params.slug !== 'undefined') {
			data = [pages[params.slug]];
		} else if(typeof params.year !== 'undefined') {
			data = [pages.hej, pages.hopp];
		} else if(typeof params.cat !== 'undefined') {
			data = [pages.hej, pages.hopp];
		}
		console.log('FETCH DATA', resource, params, config);
		debug(data);
		cb(null, data);
	},
	create: function(req, resource, params, body, config, cb) {
		Post.create({terms: ['food'], slug: 'hello', title: 'Hello Mongoose', content: 'ERMAHGERDD'}, (err, post) => {
			if(err) {
				console.log('create error', err);
				return;
			}
			console.log('post created: ')
			console.log(post);
		})
	}
};