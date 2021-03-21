const mongoose = require('mongoose');

const ssip_attachmentsSchema = mongoose.Schema({
    name: String,
    fileName: String,
    filePath: String
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('S_Attachments', ssip_attachmentsSchema);