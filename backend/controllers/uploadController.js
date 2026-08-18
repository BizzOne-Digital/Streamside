const { cloudinary } = require('../config/cloudinary');

// POST /api/upload/image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    res.json({
      success: true,
      url: req.file.path,
      publicId: req.file.filename,
      originalName: req.file.originalname,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/upload/:publicId
exports.deleteImage = async (req, res) => {
  try {
    const publicId = decodeURIComponent(req.params.publicId);
    const result = await cloudinary.uploader.destroy(publicId);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/upload/gallery — list all uploaded images
exports.getGallery = async (req, res) => {
  try {
    const { folder = 'streamside', max = 30 } = req.query;
    const result = await cloudinary.search
      .expression(`folder:${folder}/*`)
      .sort_by('created_at', 'desc')
      .max_results(Number(max))
      .execute();
    res.json({ success: true, resources: result.resources });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
