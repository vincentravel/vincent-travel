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

// Los videos se suben directo desde el navegador a Cloudinary (no pasan por nuestro servidor,
// que en Vercel tiene un límite de tamaño de request muy chico para archivos de video).
// Este endpoint solo genera la "firma" que autoriza esa subida directa.
const getVideoUploadSignature = asyncHandler(async (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = 'vincent-travel/packages';

  // Solo se firman los parámetros que realmente se van a mandar como form-data en la subida
  // (resource_type va en la URL, no es un parámetro firmado).
  const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, process.env.CLOUDINARY_API_SECRET);

  res.json({
    signature,
    timestamp,
    folder,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { publicId } = req.params;
  await cloudinary.uploader.destroy(decodeURIComponent(publicId), { resource_type: 'video' });
  res.json({ message: 'Video eliminado' });
});

module.exports = { uploadImage, deleteImage, getVideoUploadSignature, deleteVideo };
