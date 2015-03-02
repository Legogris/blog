const https = require('https');
const config = require('../configs/server.js');
const LocalStrategy = require('passport-local').Strategy;
const querystring = require('querystring');

function findUser(username, cb) {
	var matches = users.match(user => user.username === username);
	if(matches.length > 0) {
		cb(null, matches[0]);
	} else {
		cb(new Error('Invalid login'));
	}
}

const Auth = {
	ensureAuthenticated: function(req, res, next) {
		console.log('ensure')
		if(req.isAuthenticed()) {
			return next();
		}
		res.redirect('/auth/login');
	},
	serializeUser: function(user, done) {
		console.log('serialize it')
		done(null, user.username);
	},
	deserializeUser: function() {
		console.log('deserialize it')
		findUser(username, done);
	},
	callback: function(req, res) {
		//TODO: verify req.query.state
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
		}, res => {
			console.log('RESPONSE')
			var responseData = '';
			res.on('end', () => {
				var result = JSON.parse(responseData);
				console.log(result)
			});
			res.on('data', chunk => responseData += chunk);
		});
		r.write(postData);
		r.end();
			req.query.code
	},
	strategy: new LocalStrategy((username, password, done) => {
		console.log('derp')
		process.nextTick(() => {
			findUser(username, (err, user) => {
				if(err) {
					return done(err);
				}
				if(user.password !== password) {
					return done(new Error('Invalid login'))
				}
				return done(null, user);
			})
		});
	})
}

module.exports = Auth;