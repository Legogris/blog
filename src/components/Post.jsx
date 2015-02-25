'use strict';
var marked = require('marked');
var React = require('react');
var Page = require('./Page.jsx')

var Post = React.createClass({
    render: function() {
    	var post = this.props.post;
        return (
        	<Page title={post.title} href={post.url}>
	        	<time>{post.date}</time>
	        	<div dangerouslySetInnerHTML={{__html: marked(post.content)}}></div>
        	</Page>)
    }
});

module.exports = Post;