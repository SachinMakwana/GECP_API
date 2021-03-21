const mongoose = require('mongoose');

const grievence_memberDetailsSchema = mongoose.Schema({
    name: String,
    role: String,
    designation: String,
    department: String,
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('GMember', grievence_memberDetailsSchema);