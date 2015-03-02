'use strict';
const React = require('react');
const AuthActions = require('../actions/AuthActions');
const FluxibleMixin = require('fluxible').FluxibleMixin;

const Login = React.createClass({
	mixins: [FluxibleMixin],
	getInitialState: function() {
		return {
			username: ''
		}
	},
	render: function() {
		return (
			<div>
				<input type="text" value={this.state.username} onChange={this.handleChange}/>
				<button onClick={this.login}>Log in</button>
			</div>
		);
	},
	login: function() {
		this.executeAction(AuthActions.login,
			{ originalURL: 'http://remerge.net/' });
	},
	handleChange: function(e) {
		this.setState({username: e.target.value});
	}
});

module.exports = Login;
