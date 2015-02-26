'use strict';
var React = require('react');

var Page = React.createClass({
    render: function() {
        return (
        	<article>
	            <h1><a href={this.props.href}>{this.props.title}</a></h1>
	            <div className="block-content">
		            {this.props.children}
	            </div>
	            <section className="share">
		            <iframe src={'//hnbutton.appspot.com/button?title=' + this.props.title + '&url=' + 'http%3A%2F%2Fjlogster.com%2FPresenting-The-Most-Over-Engineered-Blog-Ever'} className='hn-share' width="75px" height="20px" frameBorder="0" scrolling="no" />
	            <a href="http://news.ycombinator.com/submit" class="hn-share-button" data-title="Some title" data-url="http://test.com">Vote on HN</a>
	            </section>
            </article>
	        );
	    }
	});
//TODO: URLencode title, url

module.exports = Page;
