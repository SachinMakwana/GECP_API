const mongoose = require('mongoose');

const facultyTabSchema = mongoose.Schema({
    name: String,
    title: String,
    description: String,
    facultyId: { type: Number, ref: 'Faculties' },
    position: Number,
    createdAtInt: String,
    updatedAtInt: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('FacultyTab', facultyTabSchema);