import multer from 'multer';
import multerS3 from 'multer-s3';

import s3 from './s3';

const upload = multer({
	storage: multerS3({
		s3,
		bucket: process.env.STATIC_AWS_BUCKET,
		storageClass: 'REDUCED_REDUNDANCY',
		key: function(req, file, cb) {
			const [ filetype, filesubtype ] = file.mimetype.split('/');

			cb(null, `${req.params.placeId}/${file.fieldname}-${Date.now()}.${filesubtype}`);
		},
		fileFilter: (req, file, cb) => {
			console.log('file', file);
			const [ filetype, filesubtype ] = file.mimetype.split('/');

			if (filetype !== 'image') {
				cb(null, false);
			}
		},
		limits: {
			fileSize: 1024 * 1024 * 2, // max 2MB
		},
	}),
});

export default upload;
