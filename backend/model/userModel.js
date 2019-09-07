const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: { type: String, unique : true ,required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    profilImage: { type: String, required: false },
    dateCreation: { type: Date, required: true }
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);