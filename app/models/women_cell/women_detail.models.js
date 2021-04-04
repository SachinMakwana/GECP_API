const mongoose = require('mongoose');

const WdetailSchema = mongoose.Schema({
    description: String,
    measure: String,
    image: String,
    coverPhoto: String,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('WomenDetail', WdetailSchema);