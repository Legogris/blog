const https = require('https');
const config = require('../configs/server.js');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');

function findUser(username, cb) {
	var matches = users.match(user => user.username === username);
	if(matches.length > 0) {
		cb(null, matches[0]);
	} else {
		cb(new Error('Invalid login'));
	}
}

const Auth = {
	callback: function(req, res) {
		//TODO: verify req.query.state
		var state = req.query.state.split('_');
		var originalURL = state[1];
		var postData = querystring.stringify({
			code: req.query.code,
			client_id: config.google.clientID,
			client_secret: config.google.clientSecret,
			redirect_uri: config.google.redirectURI,
			grant_type: 'authorization_code'
		});
		var r = https.request({
			host: 'www.googleapis.com',
			path: '/oauth2/v3/token',
			method: 'POST',
			headers: {
			    'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': postData.length
			}
		}, resp => {
			var responseData = '';
			resp.on('end', () => {
				const result = JSON.parse(responseData);
				const idToken = jwt.decode(result.id_token);
				if (!idToken){
					console.log('error: ', responseData);
					res.write('fail');
					res.end();
					return;
				} 
				const user = config.users[idToken.sub];
				req.session.user = user;
				console.log('Logged in '+ user.username);
				console.log('Redirecting to ' + originalURL)
				res.writeHead(302, {
					Location: originalURL
				});
				res.end();
			});
			resp.on('data', chunk => responseData += chunk);
		});
		r.write(postData);
		r.end();
	},
}

module.exports = Auth;