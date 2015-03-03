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
            <div className="editor">
            <form className="pure-form pure-form-aligned">
                <fieldset>
                    <div className="pure-control-group">
                        <label htmlFor="terms">Terms</label><input type="text" value={post.terms.length == 0 ? '' : post.terms.reduce((x,y) => x + ' ' + y)} onChange={this.handleTermsChange}/>
                    </div>
                    <div className="pure-control-group">
                        <label htmlFor="title">Title</label><input type="text" value={post.title} onChange={this.handleTextChange('title')}/>
                    </div>
                    <div className="pure-control-group">
                        <label htmlFor="category">Category</label><input type="text" value={post.cat} onChange={this.handleTextChange('cat')}/>
                    </div>
                    <div className="pure-control-group">
                        <label htmlFor="slug">Slug</label><input type="text" value={post.slug} onChange={this.handleTextChange('slug')}/>
                    </div>
                    <div className="pure-controls">
                        <textarea onChange={this.handleTextChange('content')} value={post.content}/>
                        <button onClick={this.handleSave} className="pure-button pure-button-primary">Publish</button>
                    </div>
                </fieldset>
            </form>
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