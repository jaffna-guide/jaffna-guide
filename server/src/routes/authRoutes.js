import passport from 'passport';
import jwt from 'jwt-simple';

function tokenForUser(user) {
	const iat = new Date().getTime();
	return jwt.encode({ sub: user.id, iat }, process.env.JWT_SECRET);
}

export default (app) => {
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
		console.log('req.query', req.query);
		res.redirect(`/?token=1234`);
	});

	app.get('/api/auth_user', (req, res) => {
		res.send(req.user);
	});
};
