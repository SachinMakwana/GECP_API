const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const placementSchema = mongoose.Schema({
    _id: Number,
    dateOfCampus: String,
    companyId: { type: Number, ref: 'Company' },
    deptCode: { type: Number, ref: 'Department' },
    studentsTaken: Number,
    lowestPkg: Number,
    highestPkg: Number,
    createdAtInt: Number,
    updatedAtInt: Number
}, {
    timestamps: true,
    _id: false
});

placementSchema.plugin(AutoIncrement, { id: 'placement_model_id_counter' })
module.exports = mongoose.model('Placement', placementSchema);