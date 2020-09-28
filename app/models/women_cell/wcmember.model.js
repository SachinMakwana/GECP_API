const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const wc_memberSchema = mongoose.Schema({
    _id: Number,
    wc_name: String,
    wc_role: String,
    wc_designation: String,
    wc_department: String,
}, {
    _id: false
}
);

wc_memberSchema.plugin(AutoIncrement, { id: 'wcmember_id_counter' });

module.exports = mongoose.model('WomenMember', wc_memberSchema);