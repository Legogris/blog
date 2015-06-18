'use strict';

var React = require('react');
var Fluxible = require('fluxible');
var routrPlugin = require('fluxible-plugin-routr');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var fetchr = fetchrPlugin({ xhrPath: '/api' });

// create new fluxible instance
var app = new Fluxible({
    component: React.createFactory(require('./components/Application.jsx'))
});

// add routes to the routr plugin
app.plug(routrPlugin({
    routes: require('./configs/routes')
}));

//add REST services
app.plug(fetchr);

// register stores
app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/PageStore'));
app.registerStore(require('./stores/AuthStore'));

module.exports = app;
