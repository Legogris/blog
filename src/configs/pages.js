var routes = require('./routes');

module.exports = {
	topmenu: [
	    {
	        path: '/food',
	        title: 'Food'
	    },
	    {
	        path: '/tech',
	        title: 'Tech'
	    },
	    {
	        path: '/banter',
	        title: 'Banter'
	    },
	],
	sidebar: {
		home: routes['home'],
		about: routes['about']
	}
};