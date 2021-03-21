const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema);