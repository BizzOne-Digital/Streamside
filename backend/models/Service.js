const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String },
  description: { type: String },
  price: { type: String, required: true },
  priceNote: { type: String, default: '/month + applicable taxes' },
  badge: { type: String }, // e.g. "MOST POPULAR"
  badgeColor: { type: String, default: '#2F855A' },
  features: [{ type: String }],
  ctaText: { type: String, default: 'Book a Free Bookkeeping Fit Call' },
  ctaLink: { type: String, default: '/contact' },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  type: { type: String, enum: ['plan', 'addon', 'rescue'], default: 'plan' },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
