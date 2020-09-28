const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const NssSchema = mongoose.Schema({

    _id: Number,
    nss_title: String,
    nss_fileName: String,
    nss_filePath: String
	
}, {
    timestamps: true,
    _id: false
});

NssSchema.plugin(AutoIncrement,{id:'nss_id_counter'});

module.exports = mongoose.model('Nss', NssSchema);