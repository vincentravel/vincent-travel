const streamifier = require('streamifier');
const asyncHandler = require('../utils/asyncHandler');
const cloudinary = require('../config/cloudinary');

function uploadBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'vincent-travel/packages' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se recibió ninguna imagen' });
  }

  const result = await uploadBuffer(req.file.buffer);
  res.status(201).json({ url: result.secure_url, publicId: result.public_id });
});

const deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.params;
  await cloudinary.uploader.destroy(decodeURIComponent(publicId));
  res.json({ message: 'Imagen eliminada' });
});

module.exports = { uploadImage, deleteImage };
