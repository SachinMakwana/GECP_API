const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ssip_attachmentsSchema = mongoose.Schema({
    _id: Number,
    name: String,
    fileName: String,
    filePath: String
}, {
    _id: false
}
);

ssip_attachmentsSchema.plugin(AutoIncrement, { id: 'ssip_attachments_model_id_counter' });

module.exports = mongoose.model('S_Attachments', ssip_attachmentsSchema);