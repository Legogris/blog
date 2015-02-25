'use strict';


/**
 * This leverages Express to create and run the http server.
 * A fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

require('node-jsx').install({ harmony: true, extension: '.jsx' });

//ES6 Shims
require('object.assign').shim();

const express = require('express');
const serialize = require('serialize-javascript');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const React = require('react');
const navigateAction = require('flux-router-component').navigateAction;
const debug = require('debug')('blog');


const app = require('./app');
const fetchr = app.getPlugin('FetchrPlugin');
const htmlComponent = React.createFactory(require('./components/Html.jsx'));


//Database
const mongoose = require('mongoose');
mongoose.connect('mongo', 'blog');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Connected to db')
});

const server = express();
const staticPath = {
    development: 'build',
    production: 'dist'
}[server.get('env')];

server.set('state namespace', 'App');
server.use('/js', express.static(__dirname + '/../'+staticPath+'/js'));
server.use('/css', express.static(__dirname + '/../'+staticPath+'/css'));
server.use('/static', express.static(__dirname + '/../'+staticPath+'/static'));
server.use(cookieParser());
server.use(bodyParser.json());
//server.use(csrf({cookie: true}));

//SERVICES
fetchr.registerService(require('./services/PageService'));
fetchr.registerService(require('./services/PostService'));
server.use(fetchr.getXhrPath(), fetchr.getMiddleware());

server.use(function (req, res, next) {
    let context = app.createContext({
        req: req,
        xhrContext: {
        //    _csrf: req.csrfToken()
        }
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
        debug('Rendering Application component into html');
        var appComponent = app.getAppComponent();
        React.withContext(context.getComponentContext(), () => {
            let html = htmlComponent({
                state: exposed,
                markup: React.renderToString(appComponent())
            });
            let markup = React.renderToStaticMarkup(html);

            if(server.get('env') === 'development') {
                markup = markup.replace('</html>', '<script src="//localhost:35729/livereload.js"></script></html>');
            }
            debug('Sending markup');
            res.write('<!DOCTYPE html>' + markup);
            res.end();
        });
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
