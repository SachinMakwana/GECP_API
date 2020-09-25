const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const placement_attachmentsSchema = mongoose.Schema({
    _id: Number,
    name: String,
    fileName: String,
    filePath: String
}, {
    _id: false
});

placement_attachmentsSchema.plugin(AutoIncrement, { id: 'placement_attachments_model_id_counter' });

module.exports = mongoose.model('Placement_Attachments', placement_attachmentsSchema);