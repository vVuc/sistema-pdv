const bucketS3 = require('../configs/bucketS3');

const deleteImage = async (file) => {
  const url = file.produto_imagem;
  const lastIndex = url.lastIndexOf('/');
  const fileName = url.substring(lastIndex + 1);
  await bucketS3
    .deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
    })
    .promise();
};

module.exports = deleteImage;
