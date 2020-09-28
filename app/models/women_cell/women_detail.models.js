const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const WdetailSchema = mongoose.Schema({
	_id : Number,
    women_description: String,
}, {
    timestamps: true,
    _id: false
});

WdetailSchema.plugin(AutoIncrement,{id:'women_detail_id_counter'});

module.exports = mongoose.model('WomenDetail', WdetailSchema);