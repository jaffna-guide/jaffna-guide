import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

let callbackURL;
if (process.env.NODE_ENV === 'demo') {
  callbackURL = 'https://demo.jaffna.guide/auth/facebook/callback';
} else if (process.env.NODE_ENV === 'staging') {
  callbackURL = 'https://dev.jaffna.guide/auth/facebook/callback';
} else {
  callbackURL = 'https://jaffna.guide/auth/facebook/callback';
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
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log('profile', profile);
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
      // done();
    },
  ),
);
