require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

async function seedAdmin() {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Definí ADMIN_EMAIL y ADMIN_PASSWORD en el .env antes de correr el seed');
    process.exit(1);
  }

  await connectDB();

  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    console.log(`Ya existe un usuario admin con el email ${ADMIN_EMAIL}`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await User.hashPassword(ADMIN_PASSWORD);
  await User.create({
    name: ADMIN_NAME || 'Administrador',
    email: ADMIN_EMAIL.toLowerCase(),
    passwordHash,
    role: 'admin',
  });

  console.log(`Usuario admin creado: ${ADMIN_EMAIL}`);
  await mongoose.disconnect();
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
