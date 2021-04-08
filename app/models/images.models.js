const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    title: String,
    image: String,
    category: String,
    categoryClass: String,
    PageId: ObjectID
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Image', ImageSchema);