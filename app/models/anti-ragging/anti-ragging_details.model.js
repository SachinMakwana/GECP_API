const mongoose = require('mongoose');

const anti_ragging_detailsSchema = mongoose.Schema({
    description: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('AntiRagging_Details', anti_ragging_detailsSchema);