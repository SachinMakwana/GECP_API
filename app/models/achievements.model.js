const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const achieveSchema = mongoose.Schema({
    _id: Number,
    title: String,
    description: String,
    image: String,
    category: String
}, {
    timestamps: true,
    _id: false
});

achieveSchema.plugin(AutoIncrement, { id: 'attachments_model_id_counter' });

module.exports = mongoose.model('Achievements', achieveSchema);
