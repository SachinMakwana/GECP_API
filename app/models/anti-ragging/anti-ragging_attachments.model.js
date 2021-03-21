const mongoose = require("mongoose");

const anti_ragging_attachmentsSchema = mongoose.Schema(
  {
    name: String,
    fileName: String,
    filePath: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model(
  "AntiRagging_Attachments",
  anti_ragging_attachmentsSchema
);
