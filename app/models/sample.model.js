const mongoose = require('mongoose');

const SampleSchema = mongoose.Schema({
    _id: Number,
    sequence_value: Number
});

module.exports = mongoose.model('Sample',SampleSchema);