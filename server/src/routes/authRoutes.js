import passport from 'passport';

export default (app) => {
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get(
		'/auth/facebook/callback',
		passport.authenticate('facebook', (req, res) => {
			res.send('someCode');
		}),
	);

	app.get('/api/auth_user', (req, res) => {
		res.send(req.user);
	});
};
