const users = require('../configs/server.js');
const LocalStrategy = require('passport-local').Strategy;

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