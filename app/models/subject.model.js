const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const subjectSchema = mongoose.Schema({
    _id: Number,
    code: Number,
    name: String,
    knownAs: String,
    sem: Number,
    deptCode: { type: mongoose.Schema.Types.Number, ref: 'Department' },
    createdAtInt: String,
    updatedAtInt: String
},{
    timestamps:true,
    _id: false
});

subjectSchema.plugin(AutoIncrement,{ id: 'subject_model_id_counter' })
module.exports = mongoose.model('Subject',subjectSchema);