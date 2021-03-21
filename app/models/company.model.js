const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: String,
    description: String,
    logo: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Company', companySchema);
