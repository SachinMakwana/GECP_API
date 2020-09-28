const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const campusSchema = mongoose.Schema({
    _id: Number,
    category: String,
    fileName: String,
    filePath: String,
    description: String //{ type: Number, ref: 'Dept'}
}, {
    _id: false
}
);

campusSchema.plugin(AutoIncrement, { id: 'campus_model_id_counter' });

module.exports = mongoose.model('Campus', campusSchema);