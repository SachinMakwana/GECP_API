const mongoose = require('mongoose');

const WomenAttachSchema = mongoose.Schema({
    wca_title: String,
    wca_fileName: String,
    wca_filePath: String

}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('WomenAttach', WomenAttachSchema);