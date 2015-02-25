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
        return (
            <div>
            	Terms: <input type="text" value={post.terms.length == 0 ? '' : post.terms.reduce((x,y) => x + ' ' + y)} onChange={this.handleTermsChange}/><br />
                Title: <input type="text" value={post.title} onChange={this.handleTextChange('title')}/><br />
                Category: <input type="text" value={post.cat} onChange={this.handleTextChange('cat')}/><br />
                Slug: <input type="text" value={post.slug} onChange={this.handleTextChange('slug')}/><br />
                <textarea onChange={this.handleTextChange('content')} value={post.content}/><br />
            	<button onClick={this.handleSave}>Publish</button>
        	</div>)
    },
    getInitialState: function() {
    	return this.getState();
    },
    getState: function() {
    	let pageStore = this.getStore(PageStore);
        let post = pageStore.getState().pages.length > 0
                ? pageStore.getState().pages[0]
                : {
                    title: '',
                    content: '',
                    terms: []
                };
    	return {
    		post: post
    	}
    },
    handleTextChange: function(field) {
        return function(e) {
        	this.state.post[field] = e.target.value;
        	this.setState(this.state);
        }.bind(this)
    },
    handleTermsChange: function(e) {
        this.state.post.terms = e.target.value.split(' ');
        this.setState(this.state);
    },
    handleSave: function(e) {
    	//Maybe let this be set externally? Oh well.
    	this.executeAction(PostActions.publish, this.state.post);

    }
});

module.exports = Editor;