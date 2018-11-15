import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3 = new aws.S3({
	secretAccessKey: process.env.STATIC_AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.STATIC_AWS_ACCESS_KEY_ID,
	region: process.env.STATIC_AWS_REGION,
});

const upload = multer({
	storage: multerS3({
		s3,
		bucket: process.env.STATIC_AWS_BUCKET,
		storageClass: 'REDUCED_REDUNDANCY',
		key: function(req, file, cb) {
			const [ filetype, filesubtype ] = file.mimetype.split('/');

			cb(null, `${file.fieldname}/${req.params.placeId}-${Date.now()}.${filesubtype}`);
		},
		fileFilter: (req, file, cb) => {
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
