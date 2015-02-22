'use strict';
var React = require('react');
var Nav = require('./Nav.jsx');

var Sidebar = React.createClass({
    render: function() {
        return (
        <div>
        	<Nav alignment="vertical" selected={this.props.currentPage} links={this.props.links} context={this.props.context}/>
        </div>);
    }
});

module.exports = Sidebar;