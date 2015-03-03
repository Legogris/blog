'use strict';
const React = require('react');
const Nav = require('./Nav.jsx');
const PageList = require('./PageList.jsx');
const Editor = require('./Editor.jsx');
const Sidebar = require('./Sidebar.jsx');
const ApplicationStore = require('../stores/ApplicationStore');
const AuthStore = require('../stores/AuthStore');
const RouterMixin = require('flux-router-component').RouterMixin;
const FluxibleMixin = require('fluxible').FluxibleMixin;
const AuthActions = require('../actions/AuthActions');
const debug = require('debug')('application');

const Application = React.createClass({
    mixins: [FluxibleMixin, RouterMixin],
    statics: {
        storeListeners: [ApplicationStore, AuthStore]
    },
    login: function() {
        this.executeAction(AuthActions.login, { originalURL: this.state.route.url });
    },
    getInitialState: function () {
        return this.getState();
    },
    getState: function () {
        let appStore = this.getStore(ApplicationStore);
        let authStore = this.getStore(AuthStore);
        return {
            user: authStore.getUser(),
            pageTitle: appStore.getPageTitle(),
            route: appStore.getCurrentRoute(),
            pages: appStore.getPages()
        };
    },
    onChange: function () {
        this.setState(this.getState());
    },
    render: function () {
        var output = '';
        if(this.state.route.config.admin && !this.state.user.admin) {
            this.login();
            return;
        }
        switch (this.state.route.name) {
            case 'edit':
                output = <Editor />;
                break;
        }
        switch (this.state.route.config.type) {
            case 'page':
                output = <PageList />;
                break;
        }
        return (
            <div id="layout" className="pure-g">
                <div id="main" className="pure-u-1 pure-u-md-3-4">
                    <div id="main-wrapper">
                        <div className="content">
                            {output}
                        </div>
                    </div>
                </div>
                <aside id="sidebar" className="pure-u-1 pure-u-md-1-4">
                        <nav id="header">
                            <Nav alignment="horizontal" selected={this.getStore(ApplicationStore).getCurrentRoute()} links={this.getStore(ApplicationStore).getPages().topmenu} />
                        </nav>
                    <Sidebar links={this.state.pages.sidebar} currentRoute={this.state.route}/>
                </aside>
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
