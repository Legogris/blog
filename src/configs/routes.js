'use strict';

const loadPage = require('../actions/loadPage');

module.exports = {
    login: {
        path: '/login',
        method: 'get',
    },
    //admin pages
    edit: {
        path: '/:cat/:year(\\d{4})/:slug/edit',
        type: 'admin',
        method: 'get',
        admin: true,
        action: loadPage.static
    },
    create: {
        path: '/edit',
        type: 'admin',
        method: 'get',
        admin: true,
        create: true,
        action: loadPage.static
    },
    home: {
        path: '/',
        method: 'get',
        type: 'page',
        action: loadPage.all
    },
    about: {
        path: '/about',
        type: 'page',
        method: 'get',
        page: 'about',
        title: 'About',
        action: loadPage.page
    },
    post: {
        path: '/:cat/:year(\\d{4})/:slug',
        method: 'get',
        type: 'page',
        action: loadPage.post
    },
    year: {
        path: '/:cat/:year(\\d{4})',
        method: 'get',
        type: 'page',
        action: loadPage.year
    },
    cat: {
        path: '/:cat',
        method: 'get',
        type: 'page',
        action: loadPage.cat
    },

};
