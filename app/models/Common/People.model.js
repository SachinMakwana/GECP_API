const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PeopleSchema = mongoose.Schema({
	_id : Number,
    Image: String,
    Name : String,
    Feedback : String,
    PageId : Number,
    Type: Number,
}, {
    timestamps: true,
    _id: false, 
    versionKey: false
});

PeopleSchema.plugin(AutoIncrement,{id:'People_id_counter'});

module.exports = mongoose.model('People', PeopleSchema);