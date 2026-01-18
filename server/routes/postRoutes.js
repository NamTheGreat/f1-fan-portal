const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPosts).post(protect, createPost);

module.exports = router;
