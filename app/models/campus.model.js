const mongoose = require('mongoose');

const campusSchema = mongoose.Schema({
    category: String,
    fileName: String,
    filePath: String,
    description: String //{ type: Number, ref: 'Dept'}
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('Campus', campusSchema);