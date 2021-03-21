const mongoose = require('mongoose');

const grievence_attachmentsSchema = mongoose.Schema({
    name: String,
    fileName: String,
    filePath: String,
    createdAtInt: String,
    updatedAtInt: String

}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('G_Attachments', grievence_attachmentsSchema);