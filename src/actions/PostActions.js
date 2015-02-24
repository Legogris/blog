const PostActions = {
	publish: function(context, payload, done) {
		context.service.create('post', payload.params, {}, function(err, post) {
			if(err) {
				console.log('Error in PostActions.publish: ', err)
			}
			done(post);
		});
	}
};

module.exports = PostActions;