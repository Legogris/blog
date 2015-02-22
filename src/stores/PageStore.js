var debug = require('debug')('pagestore');

/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');

var PageStore = createStore({
    storeName: 'PageStore',
    initialize: function (dispatcher) {
        this.pages = [];
    },
    handlers: {
        'LOAD_PAGES': 'handleLoadPages',
        'LOAD_POSTS': 'handleLoadPosts'
    },
    handleLoadPosts: function (payload) {
        debug(payload);
        this.pages = payload.posts.map((post) => Object.assign(post, {type: 'post'}));
        this.emitChange();
    },
    handleLoadPages: function (payload) {
        this.pages = payload.pages;
        this.emitChange();
    },
    getState: function () {
        return {
            pages: this.pages
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.pages = state.pages;
    }
});

module.exports = PageStore;
