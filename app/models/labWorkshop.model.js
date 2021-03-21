const mongoose = require('mongoose');

const labWorkshopSchema = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    deptCode: { type: Number, ref: 'Department' },
    description: String,
    createdAtInt: Number,
    updatedAtInt: Number
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('labworkshop', labWorkshopSchema);