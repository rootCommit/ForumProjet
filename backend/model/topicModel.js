const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    title: { type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'PostOwner', required:true },
    created_at: { type: Date, required: true }
});

module.exports = mongoose.model('Topic', topicSchema);