'use strict';
var React = require('react');
var Page = require('./Page.jsx')

var Post = React.createClass({
    render: function() {
    	var post = this.props.post;
        return (
        	<Page title={post.title} href={post.url}>
        	<time>{post.date}</time>
	        	{post.content}
        	</Page>)
    }
});

module.exports = Post;