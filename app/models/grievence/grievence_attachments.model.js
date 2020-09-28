const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const grievence_attachmentsSchema = mongoose.Schema({
    _id: Number,
    name: String,
    fileName: String,
    filePath: String,
    createdAtInt: String,
    createdAt: String, //{ type: Date, required: true, default: Date.now },
    updatedAt: String,
    updatedAtInt: String

}, {
    _id: false
}
);

grievence_attachmentsSchema.plugin(AutoIncrement, { id: 'grievence_attachments_model_id_counter' });

module.exports = mongoose.model('G_Attachments', grievence_attachmentsSchema);