const mongoose = require('mongoose');

const PeopleSchema = mongoose.Schema({
    Image: String,
    Name: String,
    Feedback: String,
    PageId: Number,
    Type: Number,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('People', PeopleSchema);