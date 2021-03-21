const mongoose = require('mongoose');

const placement_memberDetailsSchema = mongoose.Schema({
    name: String,
    role: String,
    designation: String,
    department: String,
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('Placement_Member', placement_memberDetailsSchema);