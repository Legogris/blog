'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var Html = React.createClass({
    render: function() {
        return (
            <html>
            <head>
                <meta charSet="utf-8" />
                <title>{this.props.context.getStore(ApplicationStore).getPageTitle()}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css" />
                <link rel="stylesheet" href="/public/css/style.css" />
                <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/grids-responsive-min.css" />
            </head>

            <body className="pure-skin-purple">
                <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
            </body>
            <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
            <script src="/public/js/vendors.js"></script>
            <script src="/public/js/app.js"></script>
            <script src="//localhost:35729/livereload.js"></script>
            </html>
        );
    }
});

module.exports = Html;

