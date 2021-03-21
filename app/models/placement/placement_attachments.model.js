const mongoose = require('mongoose');

const placement_attachmentsSchema = mongoose.Schema({
    name: String,
    fileName: String,
    filePath: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Placement_Attachments', placement_attachmentsSchema);