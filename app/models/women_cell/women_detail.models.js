const mongoose = require('mongoose');

const WdetailSchema = mongoose.Schema({
    women_description: String,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('WomenDetail', WdetailSchema);