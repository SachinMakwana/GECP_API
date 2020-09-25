const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const DeptSchema = mongoose.Schema({
    _id: Number,
    code: { type: mongoose.Schema.Types.Number, ref: 'Subject' },
    name: String,
    image: String,
    about: String
},{
    _id: false
});

DeptSchema.plugin(AutoIncrement, { id: 'department_model_id_counter' });
module.exports = mongoose.model('Department', DeptSchema);