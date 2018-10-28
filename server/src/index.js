import express from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

const PORT = process.env.PORT || 3000;
const app = express();

// Register strategies with passport
passport.use(new FacebookStrategy());

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// Privacy policy endpoint required by Facebook oAuth app
app.get('/privacy', (req, res) => {
  res.send({ privacy: 'policy' });
});

// User authentication with passport.js
// Facebook oAuth endpoint
app.get('/auth/facebook', () => {});

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
