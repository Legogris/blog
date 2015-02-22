var routes = require('./routes');

module.exports = {
	topmenu: [
	    {
	        path: '/food',
	        title: 'Food'
	    },
	    {
	        path: '/hacking',
	        title: 'Hacking'
	    },
	    {
	        path: '/sundry',
	        title: 'Sundry'
	    },
	],
	sidebar: {
		home: routes['home'],
		about: routes['about']
	}
};