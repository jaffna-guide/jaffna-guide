import passport from 'passport';
import jwt from 'jwt-simple';

function tokenForUser(user) {
	const iat = new Date().getTime();
	return jwt.encode({ sub: user.id, iat }, process.env.JWT_SECRET);
}

export default (app) => {
	app.get('/auth/facebook', (req, res, next) => {
		if (req.query.redirect) {
			req.session.redirectTo = req.query.redirect;
		}

		passport.authenticate('facebook')(req, res, next);
	});

	app.get(
		'/auth/facebook/callback',
		passport.authenticate('facebook', {
			failureRedirect: '/',
			session: false,
		}),
		(req, res) => {
			const token = req.user.jwt;
			console.log('req', req);
			res.send({ token, redirectTo: req.session.redirectTo });
			// res.redirect(`/?token=${token}`);
		},
	);

	app.get('/api/auth_user', (req, res) => {
		res.send(req.user);
	});
};
