const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = 'streamside/general';
    if (req.body.folder) folder = `streamside/${req.body.folder}`;
    else if (file.mimetype.includes('pdf')) folder = 'streamside/guides';
    else if (req.path.includes('resource')) folder = 'streamside/resources';
    else if (req.path.includes('logo')) folder = 'streamside/branding';

    return {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'svg'],
      transformation: file.mimetype.startsWith('image/') 
        ? [{ width: 1920, height: 1080, crop: 'limit', quality: 'auto:good' }]
        : undefined,
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'application/pdf'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('File type not supported. Use JPG, PNG, GIF, WEBP, SVG, or PDF.'));
  }
});

module.exports = { cloudinary, upload };
