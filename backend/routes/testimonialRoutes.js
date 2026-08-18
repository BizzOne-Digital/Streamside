const router = require('express').Router();
const c = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

router.get('/', c.getTestimonials);
router.get('/admin', protect, c.getAllTestimonials);
router.post('/', protect, c.createTestimonial);
router.put('/:id', protect, c.updateTestimonial);
router.delete('/:id', protect, c.deleteTestimonial);

module.exports = router;
