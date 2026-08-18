const Resource = require('../models/Resource');
const { cloudinary } = require('../config/cloudinary');

// GET /api/resources — Public
exports.getResources = async (req, res) => {
  try {
    const { category, type, featured } = req.query;
    const filter = { published: true };
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (featured) filter.featured = featured === 'true';
    const resources = await Resource.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, resources });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/resources/admin — Admin (includes unpublished)
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, resources });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/resources/:id — Public
exports.getResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource || !resource.published) return res.status(404).json({ success: false, message: 'Resource not found' });
    res.json({ success: true, resource });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/resources/:id/download — Public (track downloads)
exports.trackDownload = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, { $inc: { downloadCount: 1 } }, { new: true });
    res.json({ success: true, fileUrl: resource.fileUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/resources — Admin
exports.createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json({ success: true, resource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/resources/:id — Admin
exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });
    res.json({ success: true, resource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/resources/:id — Admin
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });
    if (resource.filePublicId) await cloudinary.uploader.destroy(resource.filePublicId, { resource_type: 'raw' });
    if (resource.thumbnailPublicId) await cloudinary.uploader.destroy(resource.thumbnailPublicId);
    await resource.deleteOne();
    res.json({ success: true, message: 'Resource deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
