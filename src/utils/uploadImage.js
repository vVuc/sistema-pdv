const bucketS3 = require('../configs/bucketS3');

const uploadImage = async (file) => {
  const image = await bucketS3
    .upload({
      Bucket: process.env.BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise();
  return image.Location;
};

module.exports = uploadImage;
