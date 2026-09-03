function notFound(req, res) {
  res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'El recurso ya existe (valor duplicado)' });
  }

  const status = err.status || 500;
  res.status(status).json({
    message: status === 500 ? 'Error interno del servidor' : err.message,
  });
}

module.exports = { notFound, errorHandler };
