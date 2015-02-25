'use strict';
var React = require('react');

var Page = React.createClass({
    render: function() {
        return (
        	<article>
	            <h1><a href={this.props.href}>{this.props.title}</a></h1>
	            <div className="block-content">
		            {this.props.children}
	            </div>
            </article>
	        );
	    }
	});

module.exports = Page;
