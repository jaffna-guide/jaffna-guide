import multer from 'multer';
import { Place } from '../models';

export const getAllPlaces = (req, res) => {
	return Place.find({}).populate('category').exec((err, places) => {
		res.send(places);
	});
};

export const createPlace = async (req, res) => {
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
	const populatedPlace = await Place.findById(place.id).populate({ path: 'category', select: '_id body' });
	res.send(populatedPlace);
};

export const updatePlace = async (req, res) => {
	const { id, ...values } = req.body;
	if (values.name) {
		values.body = values.name.en.toLowerCase().replace(/\s/g, '-').replace(/_/g, '-');
	}

	const place = await Place.findOneAndUpdate({ _id: id }, { $set: values }, { new: true }).populate('category');
	res.send(place);
};

export const deletePlace = async (req, res) => {
	await Place.deleteOne({ _id: req.params.placeId });
	res.send(200);
};

export const uploadMarker = async (req, res) => {
	const place = await Place.findOneAndUpdate(
		{ _id: req.params.placeId },
		{ $set: { marker: req.file.location } },
		{ new: true },
	).populate('category');

	res.send(place);
};
