const mongoose = require('mongoose');

const AffiliationSchema = mongoose.Schema({
    name: String,
    fileName: String,
    filePath: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Affiliation', AffiliationSchema);