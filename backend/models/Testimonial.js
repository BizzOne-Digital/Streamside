const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businessName: { type: String },
  businessType: { type: String },
  location: { type: String, default: 'Vancouver Island, BC' },
  quote: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  avatarUrl: { type: String },
  avatarPublicId: { type: String },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
