import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import mongoose from 'mongoose';

import User from '../models/User';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
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

// Register strategies with passport
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ facebookId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            facebookId: profile.id,
            displayName: profile.displayName,
          })
            .save()
            .then(newUser => {
              done(null, newUser);
            });
        }
      });

      // profile { id: '10160772623120411',
      //   username: undefined,
      //   displayName: 'Prasath ZooZai ThaZan',
      //   name:
      //   { familyName: undefined,
      //     givenName: undefined,
      //     middleName: undefined },
      //   gender: undefined,
      //   profileUrl: undefined,
      //   provider: 'facebook',
      //   _raw: '{"name":"Prasath ZooZai ThaZan","id":"10160772623120411"}',
      //   _json: { name: 'Prasath ZooZai ThaZan', id: '10160772623120411' }
      // }
      // https://graph.facebook.com/${profile.id}/picture?type=large
      // https://graph.facebook.com/${profile.id}/picture?type=small
    },
  ),
);
