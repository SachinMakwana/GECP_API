const mongoose = require('mongoose');

const VisionMissionSchema = mongoose.Schema({
    Vision: String,
    Mission: String,
    PageId: Number
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('VisionMission', VisionMissionSchema);