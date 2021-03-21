const mongoose = require('mongoose');

const CollegeSchema = mongoose.Schema({
    about_image: String,
    about_description: String,
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('College', CollegeSchema);