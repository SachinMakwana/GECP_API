const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const CommitteeSchema = mongoose.Schema({
    Image: String,
    Name: String,
    PageId: ObjectID,
    Designation: String,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('CommitteeMember', CommitteeSchema);