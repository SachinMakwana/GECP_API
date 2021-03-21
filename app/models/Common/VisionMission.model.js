const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const VisionMissionSchema = mongoose.Schema({
    Vision: String,
    Mission: String,
    PageId: ObjectID
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('VisionMission', VisionMissionSchema);