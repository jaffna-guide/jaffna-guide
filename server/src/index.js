import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieSession from 'cookie-session';
import './models/User';
import './services/passport';
import authRoutes from './routes/auth';

mongoose.connect(
  `mongodb://${process.env.JAFFNA_GUIDE_MONGO_USER}:${
    process.env.JAFFNA_GUIDE_MONGO_PASSWORD
  }@mongo.jaffna.guide:27017/jaffnaguide`,
);

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Register routes
authRoutes(app);

app.get('/', (req, res) => {
  res.send({ hi: 'demo2' });
});

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
