const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ContactInfoSchema = mongoose.Schema({
    _id: Number,
    address: String,
    phoneNo: Number,
    email: String
},{
    _id: false
});

ContactInfoSchema.plugin(AutoIncrement, {id: 'contact_info_model_id_counter'});

module.exports = mongoose.model('ContactInfo', ContactInfoSchema);

