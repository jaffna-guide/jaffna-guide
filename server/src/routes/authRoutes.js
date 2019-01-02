import passport from 'passport';
import jwt from 'jwt-simple';
import { requireAuth } from '../middlewares';

export default (app) => {
	app.get('/auth/facebook', (req, res, next) => {
		if (req.query.redirect) {
			console.log('req.query.redirect', req.query.redirect);
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
				console.log('req.session.redirectTo', req.session.redirectTo);
				const conjunction = req.session.redirectTo.includes('%3F') ? '&' : '?';
				res.redirect(`${decodeURIComponent(req.session.redirectTo)}${conjunction}token=${token}`);
			} else {
				res.send({ token });
			}
		},
	);

	app.get('/api/auth_user', requireAuth, (req, res) => {
		res.send(req.user);
	});
};
