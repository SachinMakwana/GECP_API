const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const DepartmentSchema = mongoose.Schema({
	_id:{type: mongoose.Schema.Types.Number, ref: 'Subject'},
    code: Number, 
    name: String,
    image: String,
    about: String
},{
	_id: false
});
DepartmentSchema.plugin(AutoIncrement,{id:'dept_id_counter'});

module.exports = mongoose.model('department', DepartmentSchema);