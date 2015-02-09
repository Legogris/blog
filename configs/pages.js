var routes = require('./routes');

var pages = {};
['home', 'about'].forEach(function(k) {
	pages[k] = routes[k];
});

module.exports = pages;