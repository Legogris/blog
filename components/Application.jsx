'use strict';
var React = require('react');
var Nav = require('./Nav.jsx');
var PageList = require('./PageList.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var StoreMixin = require('fluxible').StoreMixin;

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
            pages: appStore.getPages(),
            currentPage: appStore.getCurrentPage()
        };
    },
    onChange: function () {
        this.setState(this.getState());
    },
    render: function () {
        var output = '';
        console.log(this.state.route);
        switch (this.state.route.config.type) {
            case 'page':
                output = <PageList context={this.props.context} />;
                break;
        }
        return (
            <div id="layout" className="pure-g">
                <div className="pure-u-1 pure-u-md-3-4">
                    <Nav selected={this.state.currentPage} links={this.state.pages} context={this.props.context}/>
                    {output}
                </div>
                <div id="sidebar" className="pure-u-1 pure-u-md-1-4">
                    <Nav selected={this.state.currentPage} links={this.state.pages} context={this.props.context}/>
                </div>
            </div>
        );
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
