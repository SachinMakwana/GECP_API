const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const labWorkshopSchema = mongoose.Schema({
    _id: Number,
    name: String,
    category: String,
    image: String,
    deptCode: { type: Number, ref: 'Department' },
    description: String,
    createdAtInt: Number,
    updatedAtInt: Number
},{
    timestamps: true,
    _id: false
});

labWorkshopSchema.plugin(AutoIncrement, { id: 'labAndWorkshop_id_counter' });

module.exports = mongoose.model('labworkshop',labWorkshopSchema);