const mongoose = require('mongoose');

const anti_ragging_memberDetailsSchema = mongoose.Schema({
    name: String,
    role: String,
    designation: String,
    department: String,
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('AntiRagging_Member', anti_ragging_memberDetailsSchema);