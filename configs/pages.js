var routes = require('./routes');

var pages = {};
['home', 'about'].forEach(k => pages[k] = routes[k]);
module.exports = pages;