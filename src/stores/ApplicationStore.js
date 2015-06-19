'use strict';
const createStore = require('fluxible/utils/createStore');
const pagesConfig = require('../configs/pages');

const ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    handlers: {
        'CHANGE_ROUTE_SUCCESS' : 'onNavigate',
        'UPDATE_PAGE_TITLE': 'onTitleChange', //TODO: UPDATE_PAGE_META
        'UPDATE_PAGE_DESCRIPTION': 'onDescriptionChange'
    },
    initialize: function () {
        this.currentRoute = null;
        this.pages = pagesConfig;
        this.pageTitle = '';
        this.pageDescription = '';
    },
    onTitleChange: function(title) {
        this.pageTitle = title;
    },
    onDescriptionChange: function(description) {
        this.pageDescription = description;
    },
    onNavigate: function (route) {
        if (this.currentRoute && (this.currentRoute.url === route.url)) {
            return;
        }

        this.currentRoute = route;
        this.emitChange();
    },
    getPageTitle: function () {
        return this.pageTitle;
    },
    getPageDescription: function () {
        return this.pageDescription;
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
            pageTitle: this.pageTitle,
            pageDescription: this.pageDescription
        };
    },
    rehydrate: function (state) {
        this.pages = state.pages;
        this.currentRoute = state.route;
        this.pageTitle = state.pageTitle;
        this.pageDescription = state.pageDescription;
    }
});

module.exports = ApplicationStore;
