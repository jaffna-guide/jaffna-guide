import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import path from 'path';
import passport from 'passport';

import './services/passport';
import authRoutes from './routes/authRoutes';
import placeRoutes from './routes/placeRoutes';
import categoryRoutes from './routes/categoryRoutes';
import voteRoutes from './routes/voteRoutes';
import photoRoutes from './routes/photoRoutes';

const PORT = process.env.PORT || 3000;
const app = express();

/*
|-----------------------------------------------------------
| Mongo database
|-----------------------------------------------------------
*/
mongoose.connect(
	`mongodb://${process.env.JAFFNA_GUIDE_MONGO_USER}:${process.env
		.JAFFNA_GUIDE_MONGO_PASSWORD}@mongo.jaffna.guide:27017/jaffnaguide`,
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
if (process.env.NODE_ENV === 'development') {
	app.use(require('cors')({ origin: 'http://localhost:8000' }));
}

app.use(
	session({
		secret: process.env.COOKIE_KEY,
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 60000 },
	}),
);

app.use(bodyParser.json({ type: 'application/json' }));

// Logging framework
app.use(morgan('combined'));

app.use(passport.initialize());
app.use(passport.session());

/*
|-----------------------------------------------------------
| Express routes
|-----------------------------------------------------------
*/
authRoutes(app);
placeRoutes(app);
categoryRoutes(app);
voteRoutes(app);
photoRoutes(app);

/*
|-----------------------------------------------------------
| Express entrypoint
|-----------------------------------------------------------
*/
if (process.env.NODE_ENV === 'development') {
	app.get('/', (req, res) => {
		res.redirect('http://localhost:8000/');
	});
} else {
	app.use(express.static(path.join(__dirname, '../../client/build')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../../client/build/index.html'));
	});
}

// Privacy policy endpoint required by Facebook oAuth app
app.get('/privacy', (req, res) => {
	res.send({ privacy: 'policy' });
});

app.listen(PORT, (err) => {
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
