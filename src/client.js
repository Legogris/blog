/*global document, window */

'use strict';

var React = require('react');
var debug = require('debug');
var debugClient = debug('blog');
var app = require('./app');
var dehydratedState = window.App; // Sent from the server

window.React = React; // For chrome dev tool support

require('./style/blog.less');
require('./style/skin.less');
require('./style/fonts.css');
require('./static/twitter.html');
require('./static/justvectorv2-webfont.svg');
require('./static/justvectorv2-webfont.ttf');
require('./static/justvectorv2-webfont.woff');
require('./static/justvectorv2-webfont.eot');
require('./static/github.html');
require('./static/feed-icon.svg');
require('./static/header-edge.png');
require('./static/header-shadow.png');
// expose debug object to browser, so that it can be enabled/disabled from browser:
// https://github.com/visionmedia/debug#browser-support
window.fluxibleDebug = debug;

debugClient('rehydrating app');
// pass in the dehydrated server state from server.js
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;
    var mountNode = document.getElementById('app');

    debugClient('React Rendering');
    React.withContext(context.getComponentContext(), () => {
        React.render(app.getAppComponent()(), mountNode, () => {
            debugClient('React Rendered');
        });
    });
});

