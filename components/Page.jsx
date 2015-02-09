'use strict';
var React = require('react');
var PageStore = require('../stores/PageStore');
var StoreMixin = require('fluxible').StoreMixin;

var Page = React.createClass({
    mixins: [StoreMixin],
    statics: {
        storeListeners: [PageStore]
    },
    getInitialState: function() {
    	var pageStore = this.getStore(PageStore);
        return pageStore.getState();
    },
    onChange: function() {
        var state = this.getStore(PageStore).getState();
        this.setState(state);
        console.log('page onChange');
    },
    render: function() {
        console.log('Page.render')
        return (<div>
            <h1>{this.props.title}</h1>
	            <div>
		            {this.state.content}
	            </div>
                </div>
	        );
	    }
	});

module.exports = Page;
