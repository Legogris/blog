'use strict';
var createStore = require('fluxible/utils/createStore');
var routesConfig = require('../configs/routes');

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    handlers: {
        'CHANGE_ROUTE_SUCCESS' : 'handleNavigate'
    },
    initialize: function () {
        this.currentPage = null;
        this.currentRoute = null;
        this.pages = routesConfig;
        this.pageTitle = '';
    },
    handleNavigate: function (route) {
        if (this.currentRoute && (this.currentRoute.url === route.url)) {
            return;
        }

        var page = route.config.page;

        this.currentPage = page;
        this.currentRoute = route;
        this.emitChange();
    },
    getPageTitle: function () {
        return this.currentRoute.config.title();
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
