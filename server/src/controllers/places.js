import multer from 'multer';
import url from 'url';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';

import { s3 } from '../services';
import { Place, Photo, Love, Category } from '../models';

export const getPlaces = async (req, res) => {
	let q = Place.find({});

	if (req.query.body) {
		q = q.findOne({ body: req.query.body });
	}

	if (req.query.category) {
		const category = await Category.findOne({ body: req.query.category });
		q = q.find({ category: category._id });
	}

	return q.sort([ [ 'votes', -1 ] ]).populate('category').exec((err, places) => {
		res.send(places);
	});
};

export const getPlacesWithPhotos = (req, res) => {
	// Used in admin panel
	return Place.find({}).sort([ [ 'votes', -1 ] ]).populate('category').populate('photos').exec((err, places) => {
		res.send(places);
	});
};

export const createPlace = async (req, res) => {
	const { name, description, latitude, longitude, category } = req.body;

	const body = name.en.toLowerCase().replace(/\s/g, '-').replace(/_/g, '-').replace(/[^a-zA-Z-]/g, '');

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

	await place.save();
	const populatedPlace = await Place.findById(place.id).populate('category');
	res.send(populatedPlace);
};

export const updatePlace = async (req, res) => {
	const { id, ...values } = req.body;
	if (values.name) {
		values.body = values.name.en.toLowerCase().replace(/\s/g, '-').replace(/_/g, '-').replace(/[^a-zA-Z-]/g, '');
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
	if (![ 'default', 'active' ].includes(markerType)) res.status(400).send('Invalid markerType has been provided!');

	const updatedPlace = await Place.findOneAndUpdate(
		{ _id: req.params.placeId },
		{ $set: { [`marker.${markerType}`]: req.file.location, updatedBy: req.user._id, updatedAt: Date.now() } },
		{ new: true },
	).populate('category');

	res.send(updatedPlace.marker);
};

export const deleteMarker = async (req, res) => {
	const { markerType } = req.body;
	if (!markerType) res.status(400).send('markerType is required!');
	if (![ 'default', 'active' ].includes(markerType)) {
		res.status(400).send('Invalid markerType has been provided!');
	}

	const placeToUpdate = await Place.findById(req.params.placeId);
	const key = url.parse(placeToUpdate.marker[markerType]).pathname;
	s3.deleteObject({ Bucket: process.env.STATIC_AWS_BUCKET, Key: key }, async (err, data) => {
		if (err) res.sendStatus(500);

		placeToUpdate.marker[markerType] = undefined;
		placeToUpdate.updatedBy = req.user._id;
		placeToUpdate.updatedAt = Date.now();

		await placeToUpdate.save();
		res.status(200).send(placeToUpdate.marker);
	});
};

export const uploadCover = async (req, res) => {
	const updatedPlace = await Place.findOneAndUpdate(
		{ _id: req.params.placeId },
		{ $set: { cover: req.file.location, updatedBy: req.user._id, updatedAt: Date.now() } },
		{ new: true },
	);

	res.status(200).send(updatedPlace.cover);
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
		res.sendStatus(200);
	});
};

export const uploadLogo = async (req, res) => {
	const updatedPlace = await Place.findOneAndUpdate(
		{ _id: req.params.placeId },
		{ $set: { logo: req.file.location, updatedBy: req.user._id, updatedAt: Date.now() } },
		{ new: true },
	);

	res.status(200).send(updatedPlace.logo);
};

export const deleteLogo = async (req, res) => {
	const placeToUpdate = await Place.findById(req.params.placeId);
	const key = url.parse(placeToUpdate.logo).pathname;
	s3.deleteObject({ Bucket: process.env.STATIC_AWS_BUCKET, Key: key }, async (err, data) => {
		if (err) res.sendStatus(500);

		placeToUpdate.logo = undefined;
		placeToUpdate.updatedBy = req.user._id;
		placeToUpdate.updatedAt = Date.now();

		await placeToUpdate.save();
		res.sendStatus(200);
	});
};

export const uploadPlacePhotos = async (req, res) => {
	const placeToBeUpdated = await Place.findById(req.params.placeId);

	const promises = req.files.map(
		(file) =>
			new Promise((resolve, reject) => {
				s3.getObject({ Bucket: process.env.STATIC_AWS_BUCKET, Key: file.key }, async (err, data) => {
					if (err) res.status(500).send(err);

					const uploadedFile = data.Body;
					const resizedFile = await sharp(uploadedFile).resize(240, 160).toBuffer();
					const resizedKey = `${placeToBeUpdated.body}/${uuid()}.png`;

					s3.putObject(
						{
							Bucket: process.env.STATIC_AWS_BUCKET,
							StorageClass: 'REDUCED_REDUNDANCY',
							Key: resizedKey,
							Body: resizedFile,
						},
						async (err, data) => {
							if (err) res.status(500).send(err);

							const originalUrl = file.location;
							const thumbnailUrl = `https://${process.env.STATIC_AWS_BUCKET}.s3.${process.env
								.STATIC_AWS_REGION}.amazonaws.com/${resizedKey}`;

							resolve(Photo.create({ originalUrl, thumbnailUrl }));
						},
					);
				});
			}),
	);

	const createdPhotos = await Promise.all(promises);
	await placeToBeUpdated.update({ $addToSet: { photos: createdPhotos } })
	
	const updatedPlace = await Place.findById(req.params.placeId).populate('photos');

	res.status(200).send(updatedPlace.photos);
};

export const deletePlacePhoto = async (req, res) => {
	const placeToUpdate = await Place.findById(req.params.placeId).populate('photos');
	const photoToDelete = placeToUpdate.photos.find((p) => (p._id = req.params.photoId));

	const thumbnailPieces = photoToDelete.thumbnailUrl.split('/');
	const originalPieces = photoToDelete.originalUrl.split('/');

	const keys = [
		`${placeToUpdate.body}/${thumbnailPieces[thumbnailPieces.length - 1]}`,
		`${placeToUpdate.body}/${originalPieces[originalPieces.length - 1]}`,
	];

	const objectsToDelete = keys.map((k) => ({ Key: k }));

	s3.deleteObjects(
		{ Bucket: process.env.STATIC_AWS_BUCKET, Delete: { Objects: objectsToDelete } },
		async (err, data) => {
			if (err) res.sendStatus(500);

			const index = placeToUpdate.photos.findIndex((p) => p._id === req.params.photoId);

			console.log('placeToUpdate.photos: before', placeToUpdate.photos.length);
			placeToUpdate.photos.splice(index, 1);
			console.log('placeToUpdate.photos: after', placeToUpdate.photos.length);

			await placeToUpdate.save();
			await Photo.findByIdAndDelete(photoToDelete._id);

			res.status(200).send(placeToUpdate.photos);
		},
	);
};
