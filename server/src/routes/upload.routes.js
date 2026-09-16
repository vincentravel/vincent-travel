const express = require('express');
const multer = require('multer');
const {
  uploadImage,
  deleteImage,
  getVideoUploadSignature,
  deleteVideo,
  uploadPdf,
  deletePdf,
} = require('../controllers/upload.controller');
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

const uploadPdfMulter = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('El archivo debe ser un PDF'));
    }
    cb(null, true);
  },
});

const router = express.Router();

router.post('/', protect, upload.single('image'), uploadImage);
router.post('/pdf', protect, uploadPdfMulter.single('pdf'), uploadPdf);
router.delete('/video/:publicId', protect, deleteVideo);
router.delete('/pdf/:publicId', protect, deletePdf);
router.delete('/:publicId', protect, deleteImage);
router.get('/video-signature', protect, getVideoUploadSignature);

module.exports = router;
