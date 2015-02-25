'use strict';
var React = require('react');
var Nav = require('./Nav.jsx');

var Sidebar = React.createClass({
    render: function() {
        return (
        <div className="side-container">
        	<div className="egobox">
	        	<p>
	        	Whenever I have something I think might be of interest to others, it goes here.
	        	</p><p>
	        	Me? Swedish guy currently living in Japan.
	        	</p>
                <iframe src="/static/twitter.html"  className="twitter" frameborder="0" scrolling="no" allowtransparency="true"/>
        	</div>
        	<Nav alignment="vertical" selected={this.props.currentRoute} links={this.props.links} />
        </div>);
    }
});

module.exports = Sidebar;