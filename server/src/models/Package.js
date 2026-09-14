const mongoose = require('mongoose');
const slugify = require('slugify');

const CATEGORIES = [
  'egresados-primarios',
  'egresados-secundarios',
  'estudiantiles',
  'nacionales',
  'internacionales',
  'quince',
];

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    isCover: { type: Boolean, default: false },
  },
  { _id: false }
);

const videoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true, trim: true },
    categories: {
      type: [{ type: String, enum: CATEGORIES }],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'El paquete debe tener al menos una categoría',
      },
      required: true,
    },
    images: { type: [imageSchema], default: [] },
    videos: { type: [videoSchema], default: [] },
    price: {
      amount: { type: Number, min: 0 },
      onRequest: { type: Boolean, default: true },
    },
    destination: { type: String, required: true, trim: true },
    details: { type: String, trim: true, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

packageSchema.pre('validate', async function generateSlug(next) {
  if (!this.isModified('title') && this.slug) return next();

  const base = slugify(this.title, { lower: true, strict: true });
  let candidate = base;
  let suffix = 1;

  const Package = this.constructor;
  while (
    await Package.exists({ slug: candidate, _id: { $ne: this._id } })
  ) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }

  this.slug = candidate;
  next();
});

packageSchema.statics.CATEGORIES = CATEGORIES;

module.exports = mongoose.model('Package', packageSchema);
