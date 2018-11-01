// PlacesController
import { Place } from '../models';

export const getAllPlaces = (req, res) => {
	return Place.find({}, (err, places) => {
		res.send(places);
	});
};

export const createPlace = (req, res) => {
	const { name, latitude, longitude, category, description } = req.body;

	const place = new Place({
		name: {
			en: name,
		},
		latitude: parseFloat(latitude),
		longitude: parseFloat(longitude),
		category,
		description: {
			en: description,
		},
		createdBy: req.user.id,
		updatedBy: req.user.id,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	});

	place.save();

	res.send(place);
};
