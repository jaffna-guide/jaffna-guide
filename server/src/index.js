import express from 'express';
import mongoose from 'mongoose';
import './services/passport';
import authRoutes from './routes/auth';

mongoose.connect(
  `mongodb://${process.env.JAFFNA_GUIDE_MONGO_USER}:${
    process.env.JAFFNA_GUIDE_MONGO_PASSWORD
  }@mongo.jaffna.guide:27017/jaffnaguide`,
);

const PORT = process.env.PORT || 3000;
const app = express();

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
