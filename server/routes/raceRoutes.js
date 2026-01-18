const express = require('express');
const router = express.Router();
const { getRaces, getRaceById } = require('../controllers/raceController');
// const { protect } = require('../middleware/authMiddleware');

router.get('/', getRaces);
router.get('/:id', getRaceById);

module.exports = router;
