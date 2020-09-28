const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ssip_detailsSchema = mongoose.Schema({
    _id: Number,
    description: String
}, {
    _id: false
}
);

ssip_detailsSchema.plugin(AutoIncrement, { id: 'ssip_details_model_id_counter' });

module.exports = mongoose.model('Details', ssip_detailsSchema);