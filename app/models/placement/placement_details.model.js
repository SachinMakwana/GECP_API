const mongoose = require('mongoose');

const Placement_detailsSchema = mongoose.Schema({
    description: String,
    measure: String,
    image: String,
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('Placement_Details', Placement_detailsSchema);