'use strict';
var React = require('react');
var Page = require('./Page.jsx')

var Post = React.createClass({
    render: function() {
    	var post = this.props.post;
    	var date = new Date(post.date).toISOString().substring(0,10);
        return (
        	<Page title={post.title}>
        	<div className="date">{date}</div>
	        	{post.content}
        	</Page>)
    }
});

module.exports = Post;