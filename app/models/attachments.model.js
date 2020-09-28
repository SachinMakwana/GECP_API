const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AttachmentsSchema = mongoose.Schema({
    _id: Number,
    name: String,
    fileName: String,
    filePath: String,
    isDeleted: Boolean,
    createdAtInt: String,
    createdAt: String, //{ type: Date, required: true, default: Date.now },
    createdBy: String

}, {
    _id: false
});

AttachmentsSchema.plugin(AutoIncrement, { id: 'attachments_model_id_counteres' });

module.exports = mongoose.model('Attachments', AttachmentsSchema);
