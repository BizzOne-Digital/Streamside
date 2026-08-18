const router = require('express').Router();
const { uploadImage, deleteImage, getGallery } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.post('/image', protect, upload.single('file'), uploadImage);
router.delete('/:publicId', protect, deleteImage);
router.get('/gallery', protect, getGallery);

module.exports = router;
