const router = require('express').Router();
const c = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

router.get('/', c.getServices);
router.get('/public', c.getServices);
router.get('/admin', protect, c.getAllServices);
router.post('/', protect, c.createService);
router.put('/:id', protect, c.updateService);
router.delete('/:id', protect, c.deleteService);

module.exports = router;
