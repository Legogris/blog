'use strict';
const React = require('react');
const AuthStore = require('../stores/AuthStore');
const FluxibleMixin = require('fluxible').FluxibleMixin;

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
    	let result = (
        	<div className="page">
	        	<article>
		            <h1><a href={page.uri}>{page.title}</a></h1>
		            {this.state.user.admin ? <a href={page.uri + '/edit'}>Edit</a> : <div></div>}
		            <div className="block-content">
			            {page.content}
		            </div>
	            </article>
	            <section className="share">
		            <iframe className="fb-share" frameBorder="0" name="f1a608a3e899b08" allowTransparency="true" scrolling="no" title="fb:like Facebook Social Plugin" src={'http://www.facebook.com/v2.0/plugins/like.php?action=like&app_id=797411773682656&channel=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter%2FrFG58m7xAig.js%3Fversion%3D41%23cb%3Df1514584b2f235e%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%252Ff374fb96d363f24%26relation%3Dparent.parent&container_width=766&href='+shareURI+'&layout=button&locale=en_US&sdk=joey&share=true&show_faces=false'} ></iframe>
		            <iframe className="twitter-share" frameBorder="0" scrolling="no" allowTransparency="true" src={'https://platform.twitter.com/widgets/tweet_button.26f01cfa05bff9af89657dcbd8f7b705.en.html#_=1424933515646&count=none&dnt=true&lang=en&size=m&text='+shareTitle+'&url='+shareURI+'&via=legogris'} title="Tweet this" data-twttr-rendered="true" ></iframe>
		            <iframe className='hn-share' src={'//hnbutton.appspot.com/button?title=' + shareTitle + '&url=' + shareURI} frameBorder="0" scrolling="no" />
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
