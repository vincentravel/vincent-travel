const express = require('express');
const {
  listPackages,
  getPackageBySlug,
  createPackage,
  updatePackage,
  deletePackage,
} = require('../controllers/package.controller');
const { packageValidator, mongoIdValidator } = require('../validators/package.validator');
const validate = require('../middlewares/validate.middleware');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', optionalAuth, listPackages);
router.get('/:slug', optionalAuth, getPackageBySlug);
router.post('/', protect, packageValidator, validate, createPackage);
router.put('/:id', protect, mongoIdValidator, packageValidator, validate, updatePackage);
router.delete('/:id', protect, mongoIdValidator, validate, deletePackage);

module.exports = router;
