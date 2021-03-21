const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    title: String,
    image: String,
    description: String,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('News', NewsSchema);