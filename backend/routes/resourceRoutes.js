const router = require('express').Router();
const c = require('../controllers/resourceController');
const { protect } = require('../middleware/auth');

router.get('/', c.getResources);
router.get('/admin', protect, c.getAllResources);
router.get('/:id', c.getResource);
router.post('/:id/download', c.trackDownload);
router.post('/', protect, c.createResource);
router.put('/:id', protect, c.updateResource);
router.delete('/:id', protect, c.deleteResource);

module.exports = router;
