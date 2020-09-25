const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const placement_memberDetailsSchema = mongoose.Schema({
    _id: Number,
    name: String,
    role: String,
    designation: String,
    department: String,
}, {
    _id: false
}
);

placement_memberDetailsSchema.plugin(AutoIncrement, { id: 'placement_memberDetails_model_id_counter' });

module.exports = mongoose.model('Placement_Member', placement_memberDetailsSchema);