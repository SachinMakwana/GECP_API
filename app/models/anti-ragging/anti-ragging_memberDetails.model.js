const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const anti_ragging_memberDetailsSchema = mongoose.Schema({
    _id: Number,
    name: String,
    role: String,
    designation: String,
    department: String,
}, {
    _id: false
}
);

anti_ragging_memberDetailsSchema.plugin(AutoIncrement, { id: 'anti_ragging_memberDetails_model_id_counter' });

module.exports = mongoose.model('AntiRagging_Member', anti_ragging_memberDetailsSchema);