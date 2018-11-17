import aws from 'aws-sdk';

const s3 = new aws.S3({
  secretAccessKey: process.env.STATIC_AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.STATIC_AWS_ACCESS_KEY_ID,
  region: process.env.STATIC_AWS_REGION,
});

export default s3;
