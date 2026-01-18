const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    content: {
        type: String,
        required: [true, 'Please add content'],
    },
}, {
    timestamps: true,
});

module.exports = process.env.USE_MOCK_DB === 'true'
    ? require('./MockPost')
    : mongoose.model('Post', postSchema);
