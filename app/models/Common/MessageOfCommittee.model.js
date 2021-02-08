const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CommonMessageSchema = mongoose.Schema({
	_id : Number,
    Image: String,
    Title : String,
    Message : String,
    PageId : Number
}, {
    timestamps: true,
    _id: false, 
    versionKey: false
});

CommonMessageSchema.plugin(AutoIncrement,{id:'CommonMessage_id_counter'});

module.exports = mongoose.model('CommonMessage', CommonMessageSchema);