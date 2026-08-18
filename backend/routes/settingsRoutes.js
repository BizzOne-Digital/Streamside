const router = require('express').Router();
const { getSettings, updateSettings, getSetting } = require('../controllers/settingsController');
const { protect } = require('../middleware/auth');

router.get('/', getSettings);
router.get('/:key', getSetting);
router.put('/', protect, updateSettings);

module.exports = router;
