'use strict';
var createStore = require('fluxible/utils/createStore');
var pagesConfig = require('../configs/pages');

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    handlers: {
        'CHANGE_ROUTE_SUCCESS' : 'onNavigate',
        'UPDATE_PAGE_TITLE': 'onTitleChange'
    },
    initialize: function () {
        this.currentPage = null;
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

        this.currentPage = page;
        this.currentRoute = route;
        this.emitChange();
    },
    getPageTitle: function () {
        return this.pageTitle;
    },
    getCurrentPage: function () {
        return this.currentPage;
    },
    getCurrentRoute: function () {
        return this.currentRoute;
    },
    getPages: function () {
        return this.pages;
    },
    dehydrate: function () {
        return {
            currentPage: this.currentPage,
            pages: this.pages,
            route: this.currentRoute,
            pageTitle: this.pageTitle
        };
    },
    rehydrate: function (state) {
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.currentRoute = state.route;
        this.pageTitle = state.pageTitle;
    }
});

module.exports = ApplicationStore;
