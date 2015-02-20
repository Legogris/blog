'use strict';
var React = require('react');
var Page = require('./Page.jsx')

var Post = React.createClass({
    render: function() {
        return (<Page title={this.props.post.title}>{this.props.post.content}</Page>)
    }
});

module.exports = Post;