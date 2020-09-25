const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AffiliationSchema = mongoose.Schema({
    _id: Number,
    name: String,
    fileName: String,
    filePath: String
},{
    _id: false
});

AffiliationSchema.plugin(AutoIncrement, { id: 'affiliation_model_id_counter' });
module.exports = mongoose.model('Affiliation', AffiliationSchema);