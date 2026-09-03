const mongoose = require('mongoose');

let cachedConnection = null;

async function connectDB() {
  if (cachedConnection) return cachedConnection;

  if (!process.env.MONGODB_URI) {
    throw new Error('Falta la variable de entorno MONGODB_URI');
  }

  mongoose.set('strictQuery', true);

  cachedConnection = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB conectado: ${cachedConnection.connection.host}`);
  return cachedConnection;
}

module.exports = connectDB;
