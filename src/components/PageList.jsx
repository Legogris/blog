'use strict';
var React = require('react');
var PageStore = require('../stores/PageStore');
var Page = require('./Page.jsx');
var Post = require('./Post.jsx');
var FluxibleMixin = require('fluxible').FluxibleMixin;
var debug = require('debug')('pagelist');

var PageList = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [PageStore]
    },
    getInitialState: function() {
        var pageStore = this.getStore(PageStore);
        return pageStore.getState();
    },
    onChange: function() {
        console.log('pageList onChange');
        var state = this.getStore(PageStore).getState();
        debug(state);
        this.setState(state);
    },
    render: function() {
        console.log('PageList.render');
        debug(this.state.pages);
        var i=0;
        var pagesHTML = this.state.pages.map(function(page) {
            switch(page.type) {
                case 'post':
                    return (<Post key={i++} post={page} />);
                    break;
                default:
                    return (<Page page={page} key={i++} />);
            }
        });
        debug(pagesHTML);
        return <div>{pagesHTML}</div>;
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        //Avoid double rendering for one page transition
        var np = nextState.pages;
        var op = this.state.pages;
        if (np === op) return false;
        if (np.length !== op.length) return true;
        for(var i = 0; i < op.length; i++) {
            if(op[i] !== np[i]) return true;
        }
        return false;
    },
});

module.exports = PageList;
