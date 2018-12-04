import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuid } from 'uuid';

import s3 from './s3';
import { Place } from '../models';

const upload = multer({
	storage: multerS3({
		s3,
		bucket: process.env.STATIC_AWS_BUCKET,
		storageClass: 'REDUCED_REDUNDANCY',
		key: async (req, file, cb) => {
			const [ filetype, filesubtype ] = file.mimetype.split('/');

			const place = await Place.findById(req.params.placeId);

			cb(null, `${place.body}/${uuid()}.${filesubtype}`);
		},
	}),
	fileFilter: (req, file, cb) => {
		const [ filetype, filesubtype ] = file.mimetype.split('/');

		if (filetype !== 'image') {
			cb(null, false);
		}

		cb(null, true);
	},
	limits: {
		fileSize: 1024 * 1024 * 1.5, // max 1.5MB
	},
});

export default upload;
