const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const facultyTabSchema = mongoose.Schema({
    _id: Number,
    name: String,
    title: String,
    description: String,
    facultyId: { type: Number, ref:'Faculties' },
    position: Number,
    createdAtInt: String,
    updatedAtInt: String
}, {
    timestamps: true,
    _id: false
});

facultyTabSchema.plugin(AutoIncrement, { id: 'faculty_tab_model_id_counter' });

module.exports = mongoose.model('FacultyTab', facultyTabSchema);