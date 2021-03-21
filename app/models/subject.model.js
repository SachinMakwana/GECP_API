const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
    code: Number,
    name: String,
    knownAs: String,
    semester: Number,
    deptName: String,

}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Subject', SubjectSchema);