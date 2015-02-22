'use strict';

var debug = require('debug')('postservice');

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
	}
};