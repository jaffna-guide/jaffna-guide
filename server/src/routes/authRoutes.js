import passport from 'passport';
import jwt from 'jwt-simple';

function tokenForUser(user) {
	const iat = new Date().getTime();
	return jwt.encode({ sub: user.id, iat }, process.env.JWT_SECRET);
}

export default (app) => {
	app.get('/auth/facebook', (req, res, next) => {
		passport.authenticate('facebook', {
			callbackURL: `/auth/facebook/callback${req.query.redirect
				? '?redirect=' + encodeURIComponent(req.query.redirect)
				: ''}`,
			session: false,
		})(req, res, next);
	});

	app.get('/auth/facebook/callback', (req, res, next) => {
		passport.authenticate('facebook', {
			callbackURL: `/auth/facebook/callback${req.query.redirect
				? '?redirect=' + encodeURIComponent(req.query.redirect)
				: ''}`,
			session: false,
		}),
			(req, res) => {
				console.log('req from callback', req);
				res.redirect(`${req.query.redirect ? req.query.redirect : '/'}?token=1234`);
			};
	});

	app.get('/api/auth_user', (req, res) => {
		res.send(req.user);
	});
};
