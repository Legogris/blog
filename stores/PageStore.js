
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
        'LOAD_PAGES': 'handleLoadPages'
    },
    handleLoadPages: function (payload) {
        //console.log('PageStore.handleContentChange', payload.pages)
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
