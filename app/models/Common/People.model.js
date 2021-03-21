const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const PeopleSchema = mongoose.Schema({
    Image: String,
    Name: String,
    Feedback: String,
    PageId: ObjectID,
    Type: Number,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('People', PeopleSchema);