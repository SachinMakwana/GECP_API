const mongoose = require('mongoose');

const GallerySchema = mongoose.Schema({
    title: String,
    image: String,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Gallery', GallerySchema);