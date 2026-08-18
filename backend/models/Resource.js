const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['guides', 'bookkeeping-basics', 'contractor-trades', 'important-dates']
  },
  type: { type: String, enum: ['download', 'article', 'link', 'checklist'], default: 'article' },
  fileUrl: { type: String },       // Cloudinary URL for PDFs/downloads
  filePublicId: { type: String },  // Cloudinary public_id for deletion
  thumbnailUrl: { type: String },
  thumbnailPublicId: { type: String },
  externalLink: { type: String },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  downloadCount: { type: Number, default: 0 },
  order: { type: Number, default: 0 },
  tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
