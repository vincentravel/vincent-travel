const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, falta el token' });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }

  const user = await User.findById(payload.sub).select('-passwordHash');
  if (!user) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  req.user = user;
  next();
});

const optionalAuth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select('-passwordHash');
    if (user) req.user = user;
  } catch (err) {
    // token inválido/expirado: seguimos como visitante anónimo
  }

  next();
});

module.exports = { protect, optionalAuth };
