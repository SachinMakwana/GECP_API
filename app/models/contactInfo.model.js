const mongoose = require('mongoose');

const ContactInfoSchema = mongoose.Schema({
    address: String,
    phoneNo: Number,
    email: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('ContactInfo', ContactInfoSchema);

