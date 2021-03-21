const mongoose = require('mongoose');

const placementSchema = mongoose.Schema({
    dateOfCampus: String,
    companyId: { type: Number, ref: 'Company' },
    deptCode: { type: Number, ref: 'Department' },
    studentsTaken: Number,
    lowestPkg: Number,
    highestPkg: Number,
    createdAtInt: Number,
    updatedAtInt: Number
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Placement', placementSchema);