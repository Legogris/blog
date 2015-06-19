'use strict';
const React = require('react');
const FluxibleMixin = require('fluxible').FluxibleMixin;
const ApplicationStore = require('../stores/ApplicationStore');
const config = require('../configs/site');
const Html = React.createClass({
    mixins: [FluxibleMixin],
    render: function() {
        let result = (
            <html>
            <head>
                <meta charSet="utf-8" />
                <title>{this.getStore(ApplicationStore).getPageTitle()}</title>
                <meta property="og:title" content={this.getStore(ApplicationStore).getPageTitle()} />
                <meta property="og:description" content={this.getStore(ApplicationStore).getPageDescription()} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={config.url + this.getStore(ApplicationStore).getCurrentRoute().url} />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css" />
                <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/grids-responsive-min.css" />
                <link rel="stylesheet" href="/css/style.css" />
            </head>

            <body className="pure-skin-purple">
                <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
            </body>
            <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
            <script src="/js/vendors.js"></script>
            <script src="/js/app.js"></script>
            </html>
        );
        return result;
    }
});

module.exports = Html;

