const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const companySchema = mongoose.Schema({
    _id: Number,
    name: String,
    description: String,
    logo: String
},{
    _id:false
});

companySchema.plugin(AutoIncrement, { id: 'company_model_id_counter' })
module.exports = mongoose.model('Company', companySchema);
