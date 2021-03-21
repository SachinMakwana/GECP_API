const mongoose = require('mongoose');

const achieveSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String,
    category: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Achievements', achieveSchema);
