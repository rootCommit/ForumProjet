const mongoose  = require('mongoose');

const postSchema = mongoose.Schema(
    {
        messageText: {type: String, required: true},
        topic: { type: mongoose.Schema.Types.ObjectId, required: true },
        author: {  type: mongoose.Schema.Types.ObjectId, required: true }
    }
);

module.exports = mongoose.model('Post', postSchema);