import fs from 'fs';
import path from 'path';
import multer from 'multer';
import url from 'url';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';

import { s3 } from '../services';
import { Place, Photo, Love, Category } from '../models';

export const getPlaces = async (req, res) => {
	let q = Place.find({});

	if (req.query.body) {
		// detail view
		q = q.findOne({ body: req.query.body }).populate({
			path: 'photos',
			populate: { path: 'likes', select: 'user', populate: { path: 'user', select: 'displayName' } },
		});
	}

	if (req.query.category) {
		// category map view
		const category = await Category.findOne({ body: req.query.category });
		q = q.find({ category: category._id });
	}

	return q.sort([ [ 'votes', -1 ] ]).populate('category').exec((err, places) => {
		res.send(places);
	});
};

export const getPlacesWithPhotos = (req, res) => {
	// Used in admin panel only
	return Place.find({}).sort([ [ 'votes', -1 ] ]).populate('category').populate('photos').exec((err, places) => {
		res.send(places);
	});
};

export const createPlace = async (req, res) => {
	const { name, description, latitude, longitude, category } = req.body;

	const body = name.en.toLowerCase().replace(/\s/g, '-').replace(/_/g, '-').replace(/[^a-zA-Z-]/g, '');

	const existingPlace = await Place.findOne({ body });
	if (existingPlace) {
		return res.status(400).send(`${existingPlace.body} already exists!`);
	}

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

	const originalPhotosToDelete = placeToDelete.photos.map((p) => ({ Key: url.parse(p.originalUrl).pathname }));
	const watermarkedPhotosToDelete = placeToDelete.photos.map((p) => ({ Key: url.parse(p.watermarkedUrl).pathname }));
	const thumbnailPhotosToDelete = placeToDelete.photos.map((p) => ({ Key: url.parse(p.thumbnailUrl).pathname }));

	const objectsToDelete = [ ...originalPhotosToDelete, ...watermarkedPhotosToDelete, ...thumbnailPhotosToDelete ];

	if (placeToDelete.cover) {
		const coverToDelete = url.parse(placeToDelete.cover).pathname;
		objectsToDelete.push(coverToDelete);
	}

	if (placeToDelete.marker && placeToDelete.marker.default) {
		const defaultMarkerToDelete = url.parse(placeToDelete.marker.default).pathname;
		objectsToDelete.push(defaultMarkerToDelete);
	}

	if (placeToDelete.marker && placeToDelete.marker.active) {
		const activeMarkerToDelete = url.parse(placeToDelete.marker.active).pathname;
		objectsToDelete.push(activeMarkerToDelete);
	}

	if (objectsToDelete.length > 0) {
		s3.deleteObjects(
			{ Bucket: process.env.STATIC_AWS_BUCKET, Delete: { Objects: objectsToDelete } },
			async (err, data) => {
				if (err) res.sendStatus(500);

				await Place.deleteOne({ _id: placeToDelete._id });
				res.sendStatus(200);
			},
		);
	} else {
		await Place.deleteOne({ _id: placeToDelete._id });
		res.sendStatus(200);
	}
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
	const jaffnaGuideLogo = fs.readFileSync(path.join(__dirname, '../assets/jaffna-guide-logo-combination.png'));
	const { creditPosition } = req.body;

	const promises = req.files.map(
		(file) =>
			new Promise((resolve, reject) => {
				s3.getObject({ Bucket: process.env.STATIC_AWS_BUCKET, Key: file.key }, async (err, data) => {
					if (err) res.status(500).send(err);

					// originalFile
					const uploadedFile = data.Body;

					// watermarkedFile
					const watermarkedFile = await sharp(uploadedFile)
						.resize({ width: 1440 })
						.overlayWith(jaffnaGuideLogo, { gravity: sharp.gravity[creditPosition] })
						.toBuffer();

					const watermarkedKey = `${placeToBeUpdated.body}/${uuid()}.png`;
					const watermarkedPromise = new Promise((resolveInner) => {
						s3.putObject(
							{
								Bucket: process.env.STATIC_AWS_BUCKET,
								StorageClass: 'REDUCED_REDUNDANCY',
								Key: watermarkedKey,
								Body: watermarkedFile,
							},
							(err, data) => {
								if (err) res.status(500).send(err);
								resolveInner();
							},
						);
					});

					// thumbnailFile
					const thumbnailFile = await sharp(uploadedFile).resize(240, 160).toBuffer();
					const thumbnailKey = `${placeToBeUpdated.body}/${uuid()}.png`;
					const thumbnailPromise = new Promise((resolveInner) => {
						s3.putObject(
							{
								Bucket: process.env.STATIC_AWS_BUCKET,
								StorageClass: 'REDUCED_REDUNDANCY',
								Key: thumbnailKey,
								Body: thumbnailFile,
							},
							(err, data) => {
								if (err) res.status(500).send(err);
								resolveInner();
							},
						);
					});

					await Promise.all([ thumbnailPromise, watermarkedPromise ]);

					const originalUrl = file.location;
					const thumbnailUrl = `https://${process.env.STATIC_AWS_BUCKET}.s3.${process.env
						.STATIC_AWS_REGION}.amazonaws.com/${thumbnailKey}`;
					const watermarkedUrl = `https://${process.env.STATIC_AWS_BUCKET}.s3.${process.env
						.STATIC_AWS_REGION}.amazonaws.com/${watermarkedKey}`;

					resolve(Photo.create({ originalUrl, thumbnailUrl, watermarkedUrl }));
				});
			}),
	);

	const createdPhotos = await Promise.all(promises);
	await placeToBeUpdated.update({ $addToSet: { photos: createdPhotos } });

	const updatedPlace = await Place.findById(req.params.placeId).populate('photos');

	res.status(200).send(updatedPlace.photos);
};

export const deletePlacePhoto = async (req, res) => {
	const placeToUpdate = await Place.findById(req.params.placeId).populate('photos');
	const photoToDelete = placeToUpdate.photos.find((p) => (p._id = req.params.photoId));

	const thumbnailPieces = photoToDelete.thumbnailUrl.split('/');
	const watermarkedPieces = photoToDelete.watermarkedUrl.split('/');
	const originalPieces = photoToDelete.originalUrl.split('/');

	const keys = [
		`${placeToUpdate.body}/${thumbnailPieces[thumbnailPieces.length - 1]}`,
		`${placeToUpdate.body}/${watermarkedPieces[watermarkedPieces.length - 1]}`,
		`${placeToUpdate.body}/${originalPieces[originalPieces.length - 1]}`,
	];

	const objectsToDelete = keys.map((k) => ({ Key: k }));

	s3.deleteObjects(
		{ Bucket: process.env.STATIC_AWS_BUCKET, Delete: { Objects: objectsToDelete } },
		async (err, data) => {
			if (err) res.sendStatus(500);

			await placeToUpdate.update({ $pull: { photos: [ photoToDelete._id ] } });
			await Photo.findByIdAndDelete(photoToDelete._id);

			const updatedPlace = await Place.findById(placeToUpdate._id).populate('photos');

			res.status(200).send(updatedPlace.photos);
		},
	);
};
