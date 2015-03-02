const Auth = {
	ensureAuthenticated: function(req, res, next) {
		if(req.isAuthenticed() { return next(); });
		res.redirect('/auth/login');
	}
}

module.exports = Auth;