const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const CollegeSchema = mongoose.Schema({
	_id : Number,
    about_image: String,
    about_description: String,
}, {
    timestamps: true,
    _id: false
});

CollegeSchema.plugin(AutoIncrement,{id:'college_id_counter'});

module.exports = mongoose.model('College', CollegeSchema);