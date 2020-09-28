const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const GallerySchema = mongoose.Schema({
	_id : Number,
    title: String,
    image: String,
}, {
    timestamps: true,
    _id: false
});

GallerySchema.plugin(AutoIncrement,{id:'gallery_id_counter'});

module.exports = mongoose.model('Gallery', GallerySchema);