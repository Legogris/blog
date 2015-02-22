'use strict';
var React = require('react');

var Page = React.createClass({
    render: function() {
        return (
        	<div className="block">
	            <h1>{this.props.title}</h1>
	            <div className="block-content">
		            {this.props.children}
	            </div>
            </div>
	        );
	    }
	});

module.exports = Page;
