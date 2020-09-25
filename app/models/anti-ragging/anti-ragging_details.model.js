const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const anti_ragging_detailsSchema = mongoose.Schema({
    _id: Number,
    description: String
}, {
    _id: false
});

anti_ragging_detailsSchema.plugin(AutoIncrement, { id: 'anti_ragging_details_model_id_counter' });

module.exports = mongoose.model('AntiRagging_Details', anti_ragging_detailsSchema);