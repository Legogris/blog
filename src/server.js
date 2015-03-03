'use strict';

/**
 * This leverages Express to create and run the http server.
 * A fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

require('node-jsx').install({ harmony: true, extension: '.jsx' });
require('object.assign').shim(); //ES6 Shims

const express = require('express');
const serialize = require('serialize-javascript');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const React = require('react');
const navigateAction = require('flux-router-component').navigateAction;
const debug = require('debug')('blog');

const Feed = require('./server/feed.js');
const Auth = require('./server/auth.js');
const app = require('./app');
const fetchr = app.getPlugin('FetchrPlugin');
const htmlComponent = React.createFactory(require('./components/Html.jsx'));
const config = require('./configs/server.js');


//========== DATABASE ===============
const mongoose = require('mongoose');
mongoose.connect('mongo', 'blog');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Connected to db')
});


//========== AUTH ===============

//========== EXPRESS ===============
const server = express();
const staticPath = {
    development: 'build',
    production: 'dist'
}[server.get('env')];

server.set('state namespace', 'App');
server.use('/js', express.static(__dirname + '/../'+staticPath+'/js'));
server.use('/css', express.static(__dirname + '/../'+staticPath+'/css'));
server.use('/static', express.static(__dirname + '/../'+staticPath+'/static'));

server.get('/feed/:cat', (req, res) => {
    console.log(Feed.generate(req.params.cat, 20).then(feed => {
        res.send(feed)
        return feed;
    }, err => {
        console.error('FEED SERVER ERROR: ', err.stack)
        res.send(err.message);
        throw new Error(err);
    }));
});

//MIDDLEWARE
server.use(cookieParser());
server.use(bodyParser.json());
server.use(methodOverride());
server.use(session({secret: config.sessionSecret }));
server.use(csrf({cookie: true}));

//SERVICES
const PageService = require('./services/PageService');
const PostService = require('./services/PostService');
const AuthService = require('./services/AuthService');
fetchr.registerService(PageService);
fetchr.registerService(PostService);
fetchr.registerService(AuthService);

server.use(fetchr.getXhrPath(), fetchr.getMiddleware());

server.get('/auth/callback', Auth.callback);
server.use(function (req, res, next) {
    let context = app.createContext({
        req: req,
        xhrContext: {
            _csrf: req.csrfToken()
        }
    });
    let actionContext = context.getActionContext(); 

    debug('Executing navigate action');
    //Check if protected resource
    let isProtected = actionContext.router.getRoute(req.url).config.admin;
    let user = req.session.user;
    if(isProtected && typeof user === 'undefined') {
        console.log('Trying to access protected resource');
        res.writeHead(302, {
            Location: AuthService.makeAuthURL(req.url)
        });
        res.end();
        return;
    }
    
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
        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';window.App.user='+JSON.stringify(user);
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

server.listen(config.port);
console.log('Listening on port ' + config.port);

//Live reload for dev
if(server.get('env') === 'development') {
    try {
        var req = require('http').request({
            host: 'localhost',
            port: 35729,
            path: '/changed?files=/'
        }).on('error', function() {}).end()
    } catch(e) {}
}
