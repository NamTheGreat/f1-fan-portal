const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Get posts
// @route   GET /api/posts
// @access  Private
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: 'Please add title and content' });
    }

    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user: req.user.id,
            username: req.user.username,
        });

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPosts,
    createPost,
};
