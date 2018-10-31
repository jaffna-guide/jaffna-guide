import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import mongoose from 'mongoose';

import User from '../models/User';

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

let callbackURL;
if (process.env.NODE_ENV === 'production') {
	callbackURL = 'https://jaffna.guide/auth/facebook/callback';
} else if (process.env.NODE_ENV === 'staging') {
	callbackURL = 'https://dev.jaffna.guide/auth/facebook/callback';
} else if (process.env.NODE_ENV === 'demo') {
	callbackURL = 'https://demo.jaffna.guide/auth/facebook/callback';
} else {
	callbackURL = '/auth/facebook/callback';
}

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_APP_ID,
			clientSecret: process.env.FACEBOOK_APP_SECRET,
			callbackURL,
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({ facebookId: profile.id }).then((existingUser) => {
				if (existingUser) {
					done(null, existingUser);
				} else {
					new User({
						facebookId: profile.id,
						displayName: profile.displayName,
					})
						.save()
						.then((newUser) => {
							done(null, newUser);
						});
				}
			});
		},
	),
	new JwtStrategy(
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest: ExtractJwt.fromHeader('authorization'),
		},
		function(payload, done) {
			User.findById(payload.sub, function(err, user) {
				if (err) {
					return done(err, false);
				}

				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			});
		},
	),
);
