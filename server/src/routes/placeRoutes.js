import mongoose from 'mongoose';
import { Place } from '../models';
import { requireAuth } from '../middlewares';
import { createPlace } from '../controllers/places';

export default (app) => {
	app.get('/api/places', (req, res) => {
		Place.find({}, (err, places) => {
			res.send(places);
		});
	});

	app.post('/api/places', requireAuth, createPlace);
};
