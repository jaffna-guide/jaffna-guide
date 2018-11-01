import passport from 'passport';
import jwt from 'jwt-simple';

export default (app) => {
	app.get('/auth/facebook', (req, res, next) => {
		if (req.query.redirect) {
			req.session.redirectTo = encodeURIComponent(req.query.redirect);
		} else {
			delete req.session.redirectTo;
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
			if (req.session.redirectTo) {
				res.redirect(`${decodeURIComponent(req.session.redirectTo)}?token=${token}`);
			} else {
				res.send({ token });
			}
		},
	);

	app.get('/api/auth_user', (req, res) => {
		res.send(req.user);
	});
};
