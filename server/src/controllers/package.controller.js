const asyncHandler = require('../utils/asyncHandler');
const Package = require('../models/Package');
const cloudinary = require('../config/cloudinary');

const listPackages = asyncHandler(async (req, res) => {
  const { category, active } = req.query;
  const filter = {};

  if (category) filter.categories = category;

  // El público solo ve paquetes activos; el admin (con token) puede pedir todos
  if (req.user) {
    if (active === 'true') filter.isActive = true;
    if (active === 'false') filter.isActive = false;
  } else {
    filter.isActive = true;
  }

  const packages = await Package.find(filter).sort({ createdAt: -1 });
  res.json({ packages });
});

const getPackageBySlug = asyncHandler(async (req, res) => {
  const pkg = await Package.findOne({ slug: req.params.slug });
  if (!pkg || (!pkg.isActive && !req.user)) {
    return res.status(404).json({ message: 'Paquete no encontrado' });
  }
  res.json({ package: pkg });
});

const createPackage = asyncHandler(async (req, res) => {
  const pkg = await Package.create(req.body);
  res.status(201).json({ package: pkg });
});

const updatePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    return res.status(404).json({ message: 'Paquete no encontrado' });
  }

  Object.assign(pkg, req.body);
  await pkg.save();
  res.json({ package: pkg });
});

const deletePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    return res.status(404).json({ message: 'Paquete no encontrado' });
  }

  await Promise.all(
    pkg.images.map((img) =>
      cloudinary.uploader.destroy(img.publicId).catch(() => null)
    )
  );

  await pkg.deleteOne();
  res.json({ message: 'Paquete eliminado' });
});

module.exports = {
  listPackages,
  getPackageBySlug,
  createPackage,
  updatePackage,
  deletePackage,
};
