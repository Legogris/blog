
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');

var PageStore = createStore({
    storeName: 'PageStore',
    initialize: function (dispatcher) {
        this.content = 'initial content...';
    },
    handleContentChange: function (payload) {
        console.log('PageStore.handleContentChange')
        this.content = 'content for page with id '+payload.id;
        this.emitChange();
    },
    handlers: {
        'LOAD_PAGE': 'handleContentChange'
    },
    getState: function () {
        return {
            content: this.content
        };
    },
    dehydrate: function () {
        console.log('pagestore dehydrate');
        return this.getState();
    },
    rehydrate: function (state) {
        console.log('pagestore rehydrate');
        this.content = state.content;
    }
});

module.exports = PageStore;
