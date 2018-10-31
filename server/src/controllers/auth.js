import passport from 'passport';

export const oauthFacebook = (req, res, next) => {
	passport.authenticate('facebook');
};

export const oauthFacebookCallback = (req, res, next) => {
	passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/api/login',
	});
};
