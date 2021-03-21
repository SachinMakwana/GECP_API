const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
    prefix: String,
    firstName: String,
    lastName: String,
    surname: String,
    designation: String,
    qualification: String,
    experience: String,
    areaOfInterest: String,
    gender: String,
    dob: String,
    doj: String,
    maritialStatus: String,
    address: String,
    contactNo: Number,
    phoneNo: Number,
    email: String,
    profileImage: String,
    deptCode: { type: Number, ref: 'Department' },
    createdAtInt: String,
    updatedAtInt: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Faculties', facultySchema);