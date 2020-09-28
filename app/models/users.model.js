const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const usersSchema = mongoose.Schema({
    _id: Number,
    username: String,
    password: String,
}, {
    _id: false
}
);

usersSchema.plugin(AutoIncrement, { id: 'users_model_id_counter' });

module.exports = mongoose.model('Users', usersSchema);