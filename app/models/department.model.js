const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
    code: Number,
    name: String,
    ShortName: String,
    image: String,
    about: String,
    coverPhoto: String,
    Intake: Number,
    TotalSubject: Number,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('department', DepartmentSchema);