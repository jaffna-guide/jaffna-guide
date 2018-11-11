// PlacesController
import { Place } from '../models';

export const getAllPlaces = (req, res) => {
	return Place.find({}).populate('category').exec((err, places) => {
		res.send(places);
	});
};

export const createPlace = (req, res) => {
	const { name, description, latitude, longitude, category } = req.body;

	const body = name.en.toLowerCase().replace(/\s/g, '-').replace(/_/g, '-');

	const place = new Place({
		body,
		name,
		latitude: parseFloat(latitude),
		longitude: parseFloat(longitude),
		category,
		description,
		createdBy: req.user.id,
		updatedBy: req.user.id,
	});

	place.save();

	res.send(place);
};

export const updatePlace = async (req, res) => {
	const { id, ...values } = req.body;
	const place = await Place.findOneAndUpdate({ _id: id }, { $set: values }, { new: false });
	res.send(place);
};
