module.exports = {
	port: process.env.PORT || 3000,
	users: {
		'1234567890': {
			username: 'username',
			admin: true
		}
	},
	sessionSecret: 'secret',
	google: {
		clientID: 'xyz123.apps.googleusercontent.com',
		clientSecret: 'skulleintetrodetva',
		baseURI: 'https://accounts.google.com/o/oauth2/auth',
		redirectURI: 'http://remerge.net/auth/callback'
	}
};
