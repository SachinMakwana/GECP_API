const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const VisionMissionSchema = mongoose.Schema({
	_id : Number,
    Vision: String,
    Mission : String,
    PageId : Number
}, {
    timestamps: true,
    _id: false, 
    versionKey: false
});

VisionMissionSchema.plugin(AutoIncrement,{id:'VisionMission_id_counter'});

module.exports = mongoose.model('VisionMission', VisionMissionSchema);