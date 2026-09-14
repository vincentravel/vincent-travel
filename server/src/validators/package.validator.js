const { body, param } = require('express-validator');
const Package = require('../models/Package');

const packageValidator = [
  body('title').trim().notEmpty().withMessage('El título es obligatorio'),
  body('description').trim().notEmpty().withMessage('La descripción es obligatoria'),
  body('destination').trim().notEmpty().withMessage('El destino es obligatorio'),
  body('details').optional({ checkFalsy: true }).trim(),
  body('categories')
    .isArray({ min: 1 })
    .withMessage('Seleccioná al menos una categoría'),
  body('categories.*')
    .isIn(Package.CATEGORIES)
    .withMessage('Categoría inválida'),
  body('images').optional().isArray().withMessage('Las imágenes deben ser una lista'),
  body('images.*.url').optional().isString(),
  body('images.*.publicId').optional().isString(),
  body('images.*.isCover').optional().isBoolean().toBoolean(),
  body('videos').optional().isArray().withMessage('Los videos deben ser una lista'),
  body('videos.*.url').optional().isString(),
  body('videos.*.publicId').optional().isString(),
  body('price.onRequest').optional().isBoolean().toBoolean(),
  body('price.amount')
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),
  body('isActive').optional().isBoolean().toBoolean(),
];

const mongoIdValidator = [param('id').isMongoId().withMessage('Id inválido')];

module.exports = { packageValidator, mongoIdValidator };
