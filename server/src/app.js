const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const packageRoutes = require('./routes/package.routes');
const uploadRoutes = require('./routes/upload.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

const allowedOrigins = [process.env.CLIENT_URL]
  .filter(Boolean)
  .map((url) => url.replace(/\/+$/, ''));

app.use(
  cors({
    origin: (origin, callback) => {
      // Sin origin (ej: curl/Postman) o algún localhost:PUERTO en desarrollo, siempre permitido.
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin) || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error('No permitido por CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/upload', uploadRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
