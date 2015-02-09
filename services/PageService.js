var pages = {
	home: {
		title: 'Hemsidan',
		content: 'xyz123 hej hej'
	},
	about: {
		title: 'Om min hemsa',
		content: 'Lite mer text serru'
	}
};
module.exports = {
	name: 'page',
	read: function(req, resource, params, config, cb) {

		var data = pages[params.id];
		console.log('FETCH DATA', resource, params, config);
		cb(null, data);
	}
};