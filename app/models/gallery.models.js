const mongoose = require('mongoose');

const GallerySchema = mongoose.Schema({
    title: String,
    image: String,
    category: String,
    categoryClass: String,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Gallery', GallerySchema);