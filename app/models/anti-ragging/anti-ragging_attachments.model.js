const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const anti_ragging_attachmentsSchema = mongoose.Schema({
    _id: Number,
    name: String,
    fileName: String,
    filePath: String
}, {
    _id: false
});

anti_ragging_attachmentsSchema.plugin(AutoIncrement, { id: 'anti_ragging_attachments_model_id_counter' });

module.exports = mongoose.model('AntiRagging_Attachments', anti_ragging_attachmentsSchema);