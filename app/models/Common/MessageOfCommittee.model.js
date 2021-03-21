const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const CommonMessageSchema = mongoose.Schema({
    Image: String,
    Title: String,
    Message: String,
    PageId: ObjectID
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('CommonMessage', CommonMessageSchema);