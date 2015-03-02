'use strict';
const createStore = require('fluxible/utils/createStore');
const pagesConfig = require('../configs/pages');

const ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    handlers: {
        'CHANGE_ROUTE_SUCCESS' : 'onNavigate',
        'UPDATE_PAGE_TITLE': 'onTitleChange'
    },
    initialize: function () {
        this.currentRoute = null;
        this.pages = pagesConfig;
        this.pageTitle = '';
    },
    onTitleChange: function(title) {
        this.pageTitle = title;
    },
    onNavigate: function (route) {
        if (this.currentRoute && (this.currentRoute.url === route.url)) {
            return;
        }

        var page = route.config.page;

        this.currentRoute = route;
        this.emitChange();
    },
    getPageTitle: function () {
        return this.pageTitle;
    },
    getCurrentRoute: function () {
        return this.currentRoute;
    },
    getPages: function () {
        return this.pages;
    },
    dehydrate: function () {
        return {
            pages: this.pages,
            route: this.currentRoute,
            pageTitle: this.pageTitle
        };
    },
    rehydrate: function (state) {
        this.pages = state.pages;
        this.currentRoute = state.route;
        this.pageTitle = state.pageTitle;
    }
});

module.exports = ApplicationStore;
