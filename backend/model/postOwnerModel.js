const mongoose = require('mongoose');

const postOwnerSchema = mongoose.Schema(
    {
        author: { type: mongoose.SchemaTypes.ObjectId, ref:'User', required: true },
        created_at: { type: Date, required:true},
        message: { type: String, required: true }
    }
);

module.exports = mongoose.model('OwnerPost', postOwnerSchema);