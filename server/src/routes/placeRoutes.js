import mongoose from 'mongoose';
import { Place } from '../models';
import { requireLogin } from '../middlewares';

// const Place = mongoose.model('Place');

export default (app) => {
	app.get('/api/places', (req, res) => {
		Place.find({}, (err, places) => {
			res.send(places);
		});
	});

	app.post('/api/places', requireLogin, (req, res) => {
		const { name, latitude, longitude, category, description } = req.body;

		const place = new Place({
			name,
			latitude: parseFloat(latitude),
			longitude: parseFloat(longitude),
			category,
			description,
			createdBy: req.user.id,
			updatedBy: req.user.id,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		});
	});
};
