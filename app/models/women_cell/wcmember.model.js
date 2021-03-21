const mongoose = require('mongoose');

const wc_memberSchema = mongoose.Schema({
    wc_name: String,
    wc_role: String,
    wc_designation: String,
    wc_department: String,
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('WomenMember', wc_memberSchema);