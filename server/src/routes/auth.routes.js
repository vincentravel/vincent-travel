const express = require('express');
const { login, me } = require('../controllers/auth.controller');
const { loginValidator } = require('../validators/auth.validator');
const validate = require('../middlewares/validate.middleware');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/login', loginValidator, validate, login);
router.get('/me', protect, me);

module.exports = router;
