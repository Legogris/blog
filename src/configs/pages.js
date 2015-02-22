var routes = require('./routes');

module.exports = {
	topmenu: {
	    cat: {
	        path: '/food',
	        title: 'Food',
	        method: 'get',
	        type: 'page',
	    }
	},
	sidebar: {
		home: routes['home'],
		about: routes['about']
	}
};