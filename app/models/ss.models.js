const mongoose = require('mongoose');

const StudentSectionSchema = mongoose.Schema({
    ss_title: String,
    ss_fileName: String,
    ss_filePath: String

}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('StudentSection', StudentSectionSchema);