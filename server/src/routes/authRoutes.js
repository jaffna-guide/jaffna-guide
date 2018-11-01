import passport from 'passport';
import jwt from 'jwt-simple';

function tokenForUser(user) {
	const iat = new Date().getTime();
	return jwt.encode({ sub: user.id, iat }, process.env.JWT_SECRET);
}

export default (app) => {
	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get(
		'/auth/facebook/callback',
		passport.authenticate('facebook', {
			failureRedirect: '/',
			session: false,
		}),
		(req, res) => {
			const token = req.user.jwt;
			res.json({ token });
		},
	);

	app.get('/api/auth_user', (req, res) => {
		res.send(req.user);
	});
};
