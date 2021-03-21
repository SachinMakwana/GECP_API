const mongoose = require('mongoose');

const ssip_memberDetailsSchema = mongoose.Schema({
    name: String,
    role: String,
    designation: String,
    department: String,
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('Member', ssip_memberDetailsSchema);