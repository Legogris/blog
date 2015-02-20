'use strict';

var loadPage = require('../actions/loadPage');

module.exports = {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        type: 'page',
        title: 'Home',
        action: loadPage.static
    },
    about: {
        path: '/about',
        type: 'page',
        method: 'get',
        page: 'about',
        title: 'About',
        action: loadPage.static
    },
    post: {
        path: '/:cat/:year(\\d{4})/:slug',
        method: 'get',
        type: 'page',
        action: loadPage.post
    }
};
