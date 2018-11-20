import multer from 'multer';
import url from 'url';

import { s3 } from '../services';
import { Place } from '../models';

export const getAllPlaces = (req, res) => {
	return Place.find({ active: true }).populate('category').exec((err, places) => {
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
	const originalImagesToDelete = placeToDelete.images.map((i) => ({ Key: url.parse(i.original).pathname }));
	const thumbnailImagesToDelete = placeToDelete.images.map((i) => ({ Key: url.parse(i.thumbnail).pathname }));
	const coverToDelete = url.parse(placeToDelete.cover).pathname;
	const defaultMarkerToDelete = url.parse(placeToDelete.marker.default).pathname;
	const activeMarkerToDelete = url.parse(placeToDelete.marker.active).pathname;
	const objectsToDelete = [
		...originalImagesToDelete,
		...thumbnailImagesToDelete,
		coverToDelete,
		defaultMarkerToDelete,
		activeMarkerToDelete,
	];
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
	const { markerType } = req.body;
	if (!markerType) res.status(400).send('markerType is required!');
	if (markerType !== 'default' || markerType !== 'active')
		res.status(400).send('Invalid markerType has been provided!');

	const updatedPlace = await Place.findOneAndUpdate(
		{ _id: req.params.placeId },
		{ $set: { marker: { [markerType]: req.file.location }, updatedBy: req.user._id, updatedAt: Date.now() } },
		{ new: true },
	).populate('category');

	res.send(updatedPlace);
};

export const deleteMarker = async (req, res) => {
	const { markerType } = req.body;
	if (!markerType) res.status(400).send('markerType is required!');
	if (markerType !== 'default' || markerType !== 'active')
		res.status(400).send('Invalid markerType has been provided!');
	
	const placeToUpdate = await Place.findById(req.params.placeId).populate('category');
	const key = url.parse(placeToUpdate.marker[markerType]).pathname;
	s3.deleteObject({ Bucket: process.env.STATIC_AWS_BUCKET, Key: key }, async (err, data) => {
		if (err) res.sendStatus(500);

		placeToUpdate.marker[markerType] = undefined;
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
	const newImages = req.files.map((file) => file.location);

	const updatedPlace = await Place.findOneAndUpdate(
		{ _id: req.params.placeId },
		{ $addToSet: { images: newImages } },
		{ new: true },
	).populate('category');

	res.status(200).send(updatedPlace);
};

export const deleteImage = async (req, res) => {
	const key = `${req.params.placeId}/${req.params.imageId}`;

	s3.deleteObject({ Bucket: process.env.STATIC_AWS_BUCKET, Key: key }, async (err, data) => {
		if (err) res.sendStatus(500);

		const imageUrl = `https://${process.env.STATIC_AWS_BUCKET}.s3.${process.env
			.STATIC_AWS_REGION}.amazonaws.com/${key}`;

		const updatedPlace = await Place.findByIdAndUpdate(
			req.params.placeId,
			{
				$pull: { images: imageUrl },
			},
			{ new: true },
		).populate('category');

		res.status(200).send(updatedPlace);
	});
};
