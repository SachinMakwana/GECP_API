const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ssip_memberDetailsSchema = mongoose.Schema({
    _id: Number,
    name: String,
    role: String,
    designation: String,
    department: String,
}, {
    _id: false
}
);

ssip_memberDetailsSchema.plugin(AutoIncrement, { id: 'ssip_memberDetails_model_id_counter' });

module.exports = mongoose.model('Member', ssip_memberDetailsSchema);