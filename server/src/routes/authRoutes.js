import passport from 'passport';

export default (app) => {
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get(
		'/auth/facebook/callback',
		passport.authenticate('facebook', {
			session: false,
			successRedirect: `/`,
			failureRedirect: '/',
		}),
	);

	app.get('/api/auth_user', (req, res) => {
		res.send(req.user);
	});
};
