'use strict';
var React = require('react');

var Page = React.createClass({
    render: function() {
        return (<div>
            <h1>{this.props.title}</h1>
	            <div>
		            {this.props.children}
	            </div>
                </div>
	        );
	    }
	});

module.exports = Page;
