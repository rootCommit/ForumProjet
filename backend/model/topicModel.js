const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    title: { type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref:'User', required }
});

module.exports = mongoose.model('Topic', topicSchema);