const mongoose = require('mongoose');

const NssSchema = mongoose.Schema({
    nss_title: String,
    nss_fileName: String,
    nss_filePath: String

}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Nss', NssSchema);