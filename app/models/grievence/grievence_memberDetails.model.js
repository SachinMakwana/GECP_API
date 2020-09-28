const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const grievence_memberDetailsSchema = mongoose.Schema({
    _id: Number,
    name: String,
    role: String,
    designation: String,
    department: String,
}, {
    _id: false
}
);

grievence_memberDetailsSchema.plugin(AutoIncrement, { id: 'grievence_memberDetails_model_id_counter' });

module.exports = mongoose.model('GMember', grievence_memberDetailsSchema);