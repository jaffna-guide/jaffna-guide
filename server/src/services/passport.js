import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jwt-simple';
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
				const iat = new Date().getTime();
				const token = jwt.encode({ sub: existingUser.id, iat }, process.env.JWT_SECRET);

				if (existingUser) {
					existingUser.jwt = token;
					existingUser.save();
					done(null, existingUser);
				} else {
					new User({
						jwt: token,
						facebookId: profile.id,
						displayName: profile.displayName,
						roles: [ 'traveller' ],
					})
						.save()
						.then((newUser) => {
							done(null, newUser);
						});
				}
			});
		},
	),
);

passport.use(
	new JwtStrategy(
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
