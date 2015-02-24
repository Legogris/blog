'use strict';


/**
 * This leverages Express to create and run the http server.
 * A fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

require('node-jsx').install({ extension: '.jsx' });

//ES6 Shims
require('object.assign').shim();

var express = require('express');
var serialize = require('serialize-javascript');
var navigateAction = require('flux-router-component').navigateAction;
var debug = require('debug')('blog');
var React = require('react');

var app = require('./app');
var fetchr = app.getPlugin('FetchrPlugin');
var htmlComponent = React.createFactory(require('./components/Html.jsx'));


//Database
const mongoose = require('mongoose');
mongoose.connect('mongo', 'blog');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Connected to db')
});

var server = express();
var staticPath = {
    development: 'build',
    production: 'dist'
}[server.get('env')];

server.set('state namespace', 'App');
server.use('/js', express.static(__dirname + '/../'+staticPath+'/js'));
server.use('/css', express.static(__dirname + '/../'+staticPath+'/css'));

//SERVICES
fetchr.registerService(require('./services/PageService.js'));
fetchr.registerService(require('./services/PostService.js'));
server.use(fetchr.getXhrPath(), fetchr.getMiddleware());

server.use(function (req, res, next) {
    var context = app.createContext({
        req: req
    });

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
        //console.log(exposed);
        debug('Rendering Application component into html');
        var appComponent = app.getAppComponent();
        var html = React.renderToStaticMarkup(htmlComponent({
            state: exposed,
            context: context.getComponentContext(),
            markup: React.renderToString(appComponent({
                context: context.getComponentContext()
            }))
        }));

        debug('Sending markup');
        res.write('<!DOCTYPE html>' + html);
        res.end();
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);


if(server.get('env') === 'development') {
    try {
        var req = require('http').request({
            host: 'localhost',
            port: 35729,
            path: '/changed?files=/'
        }).on('error', function() {}).end()
    } catch(e) {}
}
