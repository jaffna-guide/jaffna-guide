import express from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

const PORT = process.env.PORT || 3000;
const app = express();

// Register strategies with passport
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken);
    },
  ),
);

app.get('/', (req, res) => {
  res.send({ hi: 'demo2' });
});

app.get(
  '/auth/facebook',
  // https://developers.facebook.com/docs/facebook-login/permissions
  passport.authenticate('facebook', { scope: ['default', 'email'] }),
);

app.get('/auth/facebook/callback', passport.authenticate('facebook'));

// Privacy policy endpoint required by Facebook oAuth app
app.get('/privacy', (req, res) => {
  res.send({ privacy: 'policy' });
});

// User authentication with passport.js
// Facebook oAuth endpoint
// app.get('/auth/facebook', () => {});

app.listen(PORT, err => {
  if (err) {
    console.log('Err: ', err);
    return 1;
  }

  console.log(
    '===> jaffna.guide <===',
    `| NODE_ENV: ${process.env.NODE_ENV || 'development'}`,
    `| Listening on http://0.0.0.0:${PORT}.`,
  );
});
