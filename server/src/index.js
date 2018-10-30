import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';
import cookieSession from 'cookie-session';
import history from 'connect-history-api-fallback';
import './models/User';
import './services/passport';
import authRoutes from './routes/auth';

const PORT = process.env.PORT || 3000;
const app = express();

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
| Connect history API fallback
|-----------------------------------------------------------
|
| Single Page Applications (SPA) typically only utilise one
| index file that is accessible by web browsers: usually
| index.html. Navigation in the application is then commonly
| handled using JavaScript with the help of the HTML5 History
| API. This results in issues when the user hits the refresh
| button or is directly accessing a page other than the
| landing page, e.g. /help or /help/online as the web server
| bypasses the index file to locate the file at this location.
| As your application is a SPA, the web server will fail
| trying to retrieve the file and return a 404 - Not Found
| message to the user. This tiny middleware addresses some
| of the issues. Specifically, it will change the requested
| location to the index you specify (default /index.html).
|
*/
app.use(history());

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
  const webpack = require('webpack');
  const webpackConfig = require('../../client/webpack.config');
  const config = webpackConfig(process.env.NODE_ENV);
  const compiler = webpack(config);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      // https://webpack.js.org/configuration/dev-server/
      noInfo: true,
      publicPath: config && config.output.publicPath,
    }),
  );

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
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
    `| NODE_ENV: ${process.env.NODE_ENV || 'development'}`,
    `| Listening on http://0.0.0.0:${PORT}.`,
  );
});
