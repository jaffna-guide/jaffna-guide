import passport from 'passport';
import jwt from 'jwt-simple';

function tokenForUser(user) {
	const iat = new Date().getTime();
	return jwt.encode({ sub: user.id, iat }, process.env.JWT_SECRET);
}

export default (app) => {
	app.get('/auth/facebook', (req, res, next) => {
		passport.authenticate('facebook', {
			callbackURL: '/auth/facebook/callback',
			session: false,
		})(req, res, next);
	});

	app.get('/auth/facebook/callback', (req, res, next) => {
		passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/',
			session: false,
		});
  });
  
  app.get('/auth/facebook/vote', (req, res, next) => {
    passport.authenticate('facebook', {
      callbackURL: '/auth/facebook/callback/vote',
      session: false,
    })(req, res, next);
  });

	app.get('/auth/facebook/callback/vote', (req, res, next) => {
		passport.authenticate('facebook', {
			successRedirect: '/vote',
			failureRedirect: '/vote',
			session: false,
		});
	});

	app.get('/api/auth_user', (req, res) => {
		res.send(req.user);
	});
};
