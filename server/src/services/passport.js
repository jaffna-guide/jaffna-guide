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
		async (accessToken, refreshToken, profile, done) => {
			const iat = new Date().getTime();

			const existingUser = await User.findOne({ facebookId: profile.id });
			if (existingUser) {
				const token = jwt.encode({ sub: existingUser.id, iat }, process.env.JWT_SECRET);
				existingUser.jwt = token;
				await existingUser.save();
				done(null, existingUser);
			} else {
				const newUser = new User({
					facebookId: profile.id,
					displayName: profile.displayName,
					roles: [ 'traveller' ],
				});
				const token = jwt.encode({ sub: newUser.id, iat }, process.env.JWT_SECRET);
				newUser.jwt = token;
				await newUser.save();
				done(null, newUser);
			}
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
