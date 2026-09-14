const express = require('express');
const multer = require('multer');
const { uploadImage, deleteImage, getVideoUploadSignature, deleteVideo } = require('../controllers/upload.controller');
const { protect } = require('../middlewares/auth.middleware');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('El archivo debe ser una imagen'));
    }
    cb(null, true);
  },
});

const router = express.Router();

router.post('/', protect, upload.single('image'), uploadImage);
router.delete('/video/:publicId', protect, deleteVideo);
router.delete('/:publicId', protect, deleteImage);
router.get('/video-signature', protect, getVideoUploadSignature);

module.exports = router;
