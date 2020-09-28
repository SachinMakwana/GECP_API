const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const NewsSchema = mongoose.Schema({
	_id : Number,
    title: String,
    image: String,
    description: String,
}, {
    timestamps: true,
    _id: false
});

NewsSchema.plugin(AutoIncrement,{id:'news_id_counter'});

module.exports = mongoose.model('News', NewsSchema);