'use strict';
const React = require('react');
const Page = require('./Page.jsx')

const Editor = React.createClass({
    render: function() {
        return (<div>
        	<button onClick={this._onSave}>Publish</button>
        	</div>)
    },
    _onSave: function(e) {
    	let post = this.state.post;
    }
});

module.exports = Editor;