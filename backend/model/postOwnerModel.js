const mongoose = require('mongoose');

const postOwnerSchema = mongoose.Schema(
    {
        author: { type: mongoose.SchemaTypes.ObjectId, ref:'User', required },
        created_at: { type: Date, required},
        message: { type: String, required }
    }
);

module.exports = mongoose.model('OwnerPost', postOwnerSchema);