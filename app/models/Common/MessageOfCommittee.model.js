const mongoose = require('mongoose');

const CommonMessageSchema = mongoose.Schema({
    Image: String,
    Title: String,
    Message: String,
    PageId: Number
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('CommonMessage', CommonMessageSchema);