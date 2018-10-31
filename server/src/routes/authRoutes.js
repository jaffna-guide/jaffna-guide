import { oauthFacebook, oauthFacebookCallback } from '../controllers/auth';

export default (app) => {
	app.get('/auth/facebook', oauthFacebook);
	app.get('/auth/facebook/callback', oauthFacebookCallback);

	app.get('/api/auth_user', (req, res) => {
		res.send(req.user);
	});
};
