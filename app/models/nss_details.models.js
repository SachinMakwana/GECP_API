const mongoose = require('mongoose');

const nss_detailSchema = mongoose.Schema({
    description: String,
    measure: String,
    image: String,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('NssDetail', nss_detailSchema);