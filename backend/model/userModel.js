const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, unique : true ,required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profilImage: { type: String, required: false }
});

module.exports = mongoose.model('User', userSchema);