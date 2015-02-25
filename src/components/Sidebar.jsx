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
                <iframe src="/static/github.html" frameBorder="0" scrolling="0" width="170px" height="20px" className="github"></iframe>
                &nbsp;
                <iframe src="/static/twitter.html"  className="twitter" frameBorder="0" scrolling="no" allowTransparency="true"/>
                &nbsp;
                <a href="https://www.linkedin.com/in/edstrom" className="linkedin" target="_blank"><span></span></a>
        	</div>
        	<Nav alignment="vertical" selected={this.props.currentRoute} links={this.props.links} />
        </div>);
    }
});

module.exports = Sidebar;