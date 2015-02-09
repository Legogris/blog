'use strict';

var loadPage = require('../actions/loadPage');

module.exports = {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        type: 'page',
        title: function() { return 'Home'},
        action: loadPage.static
    },
    about: {
        path: '/about',
        type: 'page',
        method: 'get',
        page: 'about',
        title: function() { return 'About'},
        action: loadPage.static
    },
    dynamic: {
        path: '/dynamic',
        title: function() { return 'dynamic';},
        method: 'get',
        page: 'dynamic',
        action: loadPage.dynamic
    },
    post: {
        path: '/:cat/:year/:id',
        title: function() { return 'xxx';},
        method: 'get',
        page: 'post',
        action: loadPage.dynamic
    }
};
