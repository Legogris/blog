'use strict';
var React = require('react');

var Page = React.createClass({
    render: function() {
        console.log('Page.render')
        return (<div>
            <h1>{this.props.title}</h1>
	            <div>
		            {this.props.content}
	            </div>
                </div>
	        );
	    }
	});

module.exports = Page;
