const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const StudentSectionSchema = mongoose.Schema({

    _id: Number,
    ss_title: String,
    ss_fileName: String,
    ss_filePath: String
	
}, {
    timestamps: true,
    _id: false
});

StudentSectionSchema.plugin(AutoIncrement,{id:'ss_id_counter'});

module.exports = mongoose.model('StudentSection', StudentSectionSchema);