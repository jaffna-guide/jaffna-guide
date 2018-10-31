import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';
import cookieSession from 'cookie-session';

import './models/User';
import './services/passport';
import authRoutes from './routes/auth';

const PORT = process.env.PORT || 3000;
const app = express();

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

/*
|-----------------------------------------------------------
| Mongo database
|-----------------------------------------------------------
*/
mongoose.connect(
  `mongodb://${process.env.JAFFNA_GUIDE_MONGO_USER}:${
    process.env.JAFFNA_GUIDE_MONGO_PASSWORD
  }@mongo.jaffna.guide:27017/jaffnaguide`,
);

/*
|-----------------------------------------------------------
| Express behind proxies
|-----------------------------------------------------------
|
| When running an Express app behind a proxy such as HAProxy
| it will incorrectly register the proxy's IP address as the
| client IP address unless we set "trust proxy" to true.
| If true, the client's IP address is understood as the
| left-most entry in the X-Forwarded-* header. Keep in mind
| that this setting is only meaningful when the proxy
| actually forwards the information to the server.
| In HAProxy this is done by setting the "forwardfor" option.
|
*/
app.set('trust proxy');

/*
|-----------------------------------------------------------
| Express middleware
|-----------------------------------------------------------
*/
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  }),
);

app.use(bodyParser.json({ type: 'application/json' }));

app.use(passport.initialize());
app.use(passport.session());

/*
|-----------------------------------------------------------
| Express routes
|-----------------------------------------------------------
*/
authRoutes(app);

/*
|-----------------------------------------------------------
| Express entrypoint
|-----------------------------------------------------------
*/
if (process.env.NODE_ENV === 'development') {
  console.log('hi from here!!');
  app.get('/', (req, res) => {
    console.log('redirect happening');
    res.send('something');
    // res.redirect('http://localhost:8000');
  });
} else {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
}

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
    `| NODE_ENV: ${process.env.NODE_ENV}`,
    `| Listening on http://0.0.0.0:${PORT}.`,
  );
});
