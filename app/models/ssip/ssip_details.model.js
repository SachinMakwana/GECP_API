const mongoose = require('mongoose');

const ssip_detailsSchema = mongoose.Schema({
    description: String
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('Details', ssip_detailsSchema);