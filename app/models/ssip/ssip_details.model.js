const mongoose = require('mongoose');

const ssip_detailsSchema = mongoose.Schema({
    description: String,
    measure: String,
    image: String,
    coverPhoto: String,
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('SSIP_Details', ssip_detailsSchema);