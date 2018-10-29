import express from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

const PORT = process.env.PORT || 3000;
const app = express();

console.log('NODE_ENV', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'demo') {
  const callbackURL = 'https://demo.jaffna.guide/auth/facebook/callback';
} else if (process.env.NODE_ENV === 'staging') {
  const callbackURL = 'https://dev.jaffna.guide/auth/facebook/callback';
} else {
  const callbackURL = 'https://jaffna.guide/auth/facebook/callback';
}

console.log('callbackURL', callbackURL);

// Register strategies with passport
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken);
    },
  ),
);

app.get('/', (req, res) => {
  res.send({ hi: 'demo2' });
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook'));

// Privacy policy endpoint required by Facebook oAuth app
app.get('/privacy', (req, res) => {
  res.send({ privacy: 'policy' });
});

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
