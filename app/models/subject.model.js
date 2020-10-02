const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const SubjectSchema = mongoose.Schema({
	_id : Number,
    code: Number,
     name: String,
     knownAs: String,
     semester: Number,
     deptName: String,
    
}, {
    timestamps: true,
    _id: false
});
SubjectSchema.plugin(AutoIncrement,{_id:'subject_id_counter'});
module.exports = mongoose.model('Subject', SubjectSchema);