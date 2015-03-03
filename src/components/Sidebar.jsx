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
                    <a href="/feed/food" className="feed-link" title="Subscribe (RSS)">&#xf16e;</a>
                    <a href="https://github.com/legogris" className="github-link" title="@legogris at GitHub" target="_blank">&#xf133;</a>
                    <a href="https://twitter.com/legogris" className="twitter-link" title="@legogris at Twitter" target="_blank">&#xf182;</a>
                    <a href="https://www.linkedin.com/in/edstrom" className="linkedin-link" target="_blank" title="Find me on LinkedIn">&#xf146;</a>
                </section>
        	</div>
        </div>);
    }
});

module.exports = Sidebar;