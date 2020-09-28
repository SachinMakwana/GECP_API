const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const WomenAttachSchema = mongoose.Schema({

    _id: Number,
    wca_title: String,
    wca_fileName: String,
    wca_filePath: String
	
}, {
    timestamps: true,
    _id: false
});

WomenAttachSchema.plugin(AutoIncrement,{id:'wca_id_counter'});

module.exports = mongoose.model('WomenAttach', WomenAttachSchema);