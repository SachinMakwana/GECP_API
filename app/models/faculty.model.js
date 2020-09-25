const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const facultySchema = mongoose.Schema({
    _id: Number,
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
    _id: false
});

facultySchema.plugin(AutoIncrement, { id: 'faculty_model_id_counter' });

module.exports = mongoose.model('Faculties', facultySchema);