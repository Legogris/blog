module.exports = {
	name: 'page',
	read: function(req, resource, params, config, cb) {
		var data = {
			title: 'Titel',
			content: 'Texten'
		}
		console.log('FETCH DATA');
		cb(null, data);
	}
};