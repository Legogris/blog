'use strict';
const React = require('react');
const FluxibleMixin = require('fluxible').FluxibleMixin;
const NavLink = require('flux-router-component').NavLink;
const AuthStore = require('../stores/AuthStore');

const Page = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [AuthStore]
    },
    getInitialState: function () {
        return this.getState();
    },
    getState: function () {
        let authStore = this.getStore(AuthStore);
        return {
            user: authStore.getUser(),
        };
    },
    onChange: function () {
        this.setState(this.getState());
        console.log('CHANGE:' + this.state);
    },
    render: function() {
    	let page = this.props.page;
    	let shareURI = encodeURIComponent(page.absoluteURI);
    	let shareTitle = encodeURIComponent(page.title);
        let termHTML = page.terms.map(term => {
            return (<NavLink key={term} href={'/' + term} className={term === page.cat ? 'cat' : 'tag'}>{term}</NavLink>)
        });
    	let result = (
        	<div className="page">
	        	<article>
		            <h1><a href={page.uri}>{page.title}</a></h1>
		            {this.state.user.admin ? <a href={page.uri + '/edit'}>Edit</a> : <div></div>}
		            <div className="block-content">
			            {page.content}
		            </div>
	            </article>
                <section className="terms">
                    {termHTML}
                </section>
	            <section className="share">
                    {page.hackerNewsID > 0 ? <a href={'https://news.ycombinator.com/item?id='+page.hackerNewsID} className="hn-link" title="Share on Hacker News" target="_blank">&#xf13b;</a> : null }
                    <a href={'https://www.facebook.com/dialog/feed?sharer/sharer.php?u='+shareURI} className="facebook-link" title="Share on Facebook" target="_blank">&#xf125;</a>
                    <a href={'https://twitter.com/home?status='+shareTitle+'%20'+shareURI} className="twitter-link" title="Tweet" target="_blank">&#xf182;</a>
                    <a href={'//www.reddit.com/submit?url='+shareURI} className="reddit-link" title="Share on Reddit" target="_blank">&#xf16b;</a>
                    <a href={'https://plus.google.com/share?url='+shareURI} className="google-link" title="Share on Google+" target="_blank">&#xf135;</a>
	            </section>
            </div>
        );
		return result;
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return true;
    },
    componentDidUpdate: function(prevProps, prevState) {
        console.log('page.componentDidUpdate', this.state, prevState);
    }
});
//TODO: URLencode title, url

module.exports = Page;
