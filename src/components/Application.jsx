'use strict';
var React = require('react');
var Nav = require('./Nav.jsx');
var PageList = require('./PageList.jsx');
var Sidebar = require('./Sidebar.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var StoreMixin = require('fluxible').StoreMixin;
var debug = require('debug')('application');

var Application = React.createClass({
    propTypes: {
        context: React.PropTypes.object.isRequired
    },
    mixins: [RouterMixin, StoreMixin],
    statics: {
        storeListeners: [ApplicationStore]
    },
    getInitialState: function () {
        return this.getState();
    },
    getState: function () {
        var appStore = this.getStore(ApplicationStore);
        return {
            pageTitle: appStore.getPageTitle(),
            route: appStore.getCurrentRoute(),
            pages: appStore.getPages()
        };
    },
    onChange: function () {
        this.setState(this.getState());
    },
    render: function () {
        console.log('Application.render')
        var output = '';
        switch (this.state.route.config.type) {
            case 'page':
                output = <PageList context={this.props.context} />;
                break;
        }
        return (
            <div id="layout" className="pure-g">
                <div className="pure-u-1 pure-u-md-3-4">
                    <div id="header">
                        <Nav alignment="horizontal" selected={this.state.route} links={this.state.pages.topmenu} context={this.props.context}/>
                    </div>
                    <div className="content">
                        {output}
                    </div>
                </div>
                <div id="sidebar" className="pure-u-1 pure-u-md-1-4">
                    <Sidebar context={this.props.context} links={this.state.pages.sidebar} currentRoute={this.state.route}/>
                </div>
            </div>
        );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return true;
    },
    componentDidUpdate: function(prevProps, prevState) {
        console.log('app.componentDidUpdate');
        var newState = this.state;
        if (newState.pageTitle === prevState.pageTitle) {
            return;
        }
        document.title = newState.pageTitle;
    }
});

module.exports = Application;
