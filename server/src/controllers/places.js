import multer from 'multer';
import url from 'url';

import { s3 } from '../services';
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
	const placeToDelete = await Place.findById(req.params.placeId);
	const imagesToDelete = placeToDelete.images.map((i) => ({ Key: url.parse(i).pathname }));
	const coverToDelete = url.parse(placeToDelete.cover).pathname;
	const markerToDelete = url.parse(placeToDelete.marker).pathname;
	const objectsToDelete = [ ...imagesToDelete, coverToDelete, markerToDelete ];
	s3.deleteObjects(
		{ Bucket: process.env.STATIC_AWS_BUCKET, Delete: { Objects: objectsToDelete } },
		async (err, data) => {
			if (err) res.sendStatus(500);

			await Place.deleteOne({ _id: placeToDelete._id });
			res.sendStatus(200);
		},
	);
};

export const uploadMarker = async (req, res) => {
	const updatedPlace = await Place.findOneAndUpdate(
		{ _id: req.params.placeId },
		{ $set: { marker: req.file.location, updatedBy: req.user._id, updatedAt: Date.now() } },
		{ new: true },
	).populate('category');

	res.send(updatedPlace);
};

export const deleteMarker = async (req, res) => {
	const placeToUpdate = await Place.findById(req.params.placeId);
	const key = url.parse(placeToUpdate.marker).pathname;
	s3.deleteObject({ Bucket: process.env.STATIC_AWS_BUCKET, Key: key }, async (err, data) => {
		if (err) res.sendStatus(500);

		placeToUpdate.marker = undefined;
		placeToUpdate.updatedBy = req.user._id;
		placeToUpdate.updatedAt = Date.now();

		await placeToUpdate.save();
		res.status(200).send(placeToUpdate);
	});
};

export const uploadCover = async (req, res) => {
	const updatedPlace = await Place.findOneAndUpdate(
		{ _id: req.params.placeId },
		{ $set: { cover: req.file.location, updatedBy: req.user._id, updatedAt: Date.now() } },
		{ new: true },
	).populate('category');

	res.status(200).send(updatedPlace);
};

export const deleteCover = async (req, res) => {
	const placeToUpdate = await Place.findById(req.params.placeId);
	const key = url.parse(placeToUpdate.cover).pathname;
	s3.deleteObject({ Bucket: process.env.STATIC_AWS_BUCKET, Key: key }, async (err, data) => {
		if (err) res.sendStatus(500);

		placeToUpdate.cover = undefined;
		placeToUpdate.updatedBy = req.user._id;
		placeToUpdate.updatedAt = Date.now();

		await placeToUpdate.save();
		res.status(200).send(placeToUpdate);
	});
};

export const uploadImages = async (req, res) => {
	console.log('req.file.location', req.file.location);
	// const updatedPlace = await Place.findOneAndUpdate(
	// 	{ _id: req.params.placeId },
	// 	{ $addToSet: { images: req.file.location } },
	// 	{ new: true },
	// ).populate('category');

	res.send(updatedPlace);
};

export const deleteImage = async (req, res) => {
	const key = `${req.params.placeId}/${req.params.imageId}`;

	s3.deleteObject({ Bucket: process.env.STATIC_AWS_BUCKET, Key: key }, async (err, data) => {
		if (err) res.sendStatus(500);

		placeToUpdate.images = placeToUpdate.images.filter((i) => !i.endsWith(key));
		await placeToUpdate.save();
		res.status(200).send(placeToUpdate);
	});
};
