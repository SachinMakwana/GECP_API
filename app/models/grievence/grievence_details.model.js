const mongoose = require('mongoose');

const grievence_detailsSchema = mongoose.Schema({
    description: String,
    measure: String,
    image: String,
}, {
    timestamps: true,
    versionKey: false
}
);


module.exports = mongoose.model('Grievance_Details', grievence_detailsSchema);