var pages = {
	hej: {date: Date.now(), title: 'derp', content: ':D'},
	hopp: {
		title: 'EN TILL BLAWG',
		content: 'BLOGGELIblogg'
	}
};
module.exports = {
	name: 'post',
	read: function(req, resource, params, config, cb) {
		var data = pages[params.slug];
		console.log('FETCH DATA', resource, params, config, data);
		cb(null, data);
	}
};