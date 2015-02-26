'use strict';
const React = require('react');
const FluxibleMixin = require('fluxible').FluxibleMixin;
const Nav = require('./Nav.jsx');
const site = require('../configs/site.js');
const PageStore = require('../stores/PageStore');

const Sidebar = React.createClass({
    mixins: [FluxibleMixin],
    render: function() {
        let cat = this.getStore(PageStore).getState().cat;
        let description = !!cat ? cat.description : site.description;
        return (
        <div className="side-container">
        	<div className="egobox">
                <span className="description" dangerouslySetInnerHTML={{__html: description}} />
                <section className="social">
                    <a href="/feed/food" className="feed-link" title="Subscribe (RSS)"><img src="/static/feed-icon.svg" alt="Subscribe (RSS)"/></a>
                    &nbsp;
                    <iframe src="/static/github.html" frameBorder="0" scrolling="0" width="170px" height="20px" className="github"></iframe>
                    &nbsp;
                    <iframe src="/static/twitter.html"  className="twitter" frameBorder="0" scrolling="no" allowTransparency="true"/>
                    &nbsp;
                    <a href="https://www.linkedin.com/in/edstrom" className="linkedin" target="_blank" title="Find me on LinkedIn"><span></span></a>
                </section>
        	</div>
        	<Nav alignment="vertical" selected={this.props.currentRoute} links={this.props.links} />
        </div>);
    }
});

module.exports = Sidebar;