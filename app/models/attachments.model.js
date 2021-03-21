const mongoose = require('mongoose');

const AttachmentsSchema = mongoose.Schema({
    name: String,
    fileName: String,
    filePath: String,
    isDeleted: Boolean,
    createdAtInt: String,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Attachments', AttachmentsSchema);
