import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuid } from 'uuid';

import s3 from './s3';

const upload = multer({
	storage: multerS3({
		s3,
		bucket: process.env.STATIC_AWS_BUCKET,
		storageClass: 'REDUCED_REDUNDANCY',
		key: function(req, file, cb) {
			const [ filetype, filesubtype ] = file.mimetype.split('/');

			cb(null, `${req.params.placeId}/${uuid()}.${filesubtype}`);
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
		fileSize: 1024 * 1024 * 1, // max 1MB
	},
});

export default upload;
