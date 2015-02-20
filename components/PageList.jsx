'use strict';
var React = require('react');
var PageStore = require('../stores/PageStore');
var Page = require('./Page.jsx');
var Post = require('./Post.jsx');
var StoreMixin = require('fluxible').StoreMixin;

var PageList = React.createClass({
    mixins: [StoreMixin],
    statics: {
        storeListeners: [PageStore]
    },
    getInitialState: function() {
        var pageStore = this.getStore(PageStore);
        return pageStore.getState();
    },
    onChange: function() {
        console.log('pageList onChange', state);
        var state = this.getStore(PageStore).getState();
        this.setState(state);
    },
    render: function() {
        console.log('PageList.render', this.state.pages)
        var i=0;
        var pagesHTML = this.state.pages.map(function(page) {
            switch(page.type) {
                case 'post':
                    return (<Post key={i++} post={page} />);
                    break;
                default:
                    return (<Page key={i++} title={page.title}>{page.content}</Page>);
            }
        });
        console.log(pagesHTML);
        return <div>{pagesHTML}</div>;
    }
});

module.exports = PageList;
