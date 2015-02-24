'use strict';
const React = require('react');
const PageStore = require('../stores/PageStore');
const PostActions = require('../actions/PostActions');
const FluxibleMixin = require('fluxible').FluxibleMixin;
const debug = require('debug')('editor');

const Editor = React.createClass({
    mixins: [FluxibleMixin],
    render: function() {
    	let post = this.state.post;
        return (<div>
        	<input type="text" value={post.title} onChange={this.handleTitleChange}/><br />
        	<button onClick={this.handleSave}>Publish</button>
        	</div>)
    },
    getInitialState: function() {
    	return this.getState();
    },
    getState: function() {
    	let pageStore = this.getStore(PageStore);
    	return {
    		post: pageStore.getState().length > 0
    			? pageStore.getState()[0]
    			: {title: '', content: ''}
    	}
    },
    handleTitleChange: function(e) {
    	this.state.post.title = e.target.value;
    	this.setState(this.state);
    },
    handleSave: function(e) {
    	//Maybe let this be set externally? Oh well.
    	this.executeAction(PostActions.publish, this.state.post);

    }
});

module.exports = Editor;