'use strict';
var marked = require('marked');
var React = require('react');
var Page = require('./Page.jsx')

var Post = React.createClass({
    render: function() {
    	var post = this.props.post;
    	var page = Object.assign(post, {
    		content: (
    			<div>
	        	<time>{post.date}</time>
	        	<div dangerouslySetInnerHTML={{__html: marked(post.content)}}></div>
	        	</div>
			)
    	});
        return (
        	<Page page={page} />
 		);
    }
});

module.exports = Post;