const { Endpoint, S3 } = require('aws-sdk');
require('dotenv').config();

const endpoint = new Endpoint(process.env.ENDPOINT_S3);

const bucketS3 = new S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

module.exports = bucketS3;
