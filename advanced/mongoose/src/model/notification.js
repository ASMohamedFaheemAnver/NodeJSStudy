const mongoose = require("mongoose");
const {
  YOUTUBE_VIDEO_CATEGORY,
  PDF_CATEGORY,
} = require("../constants/category");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    description: { type: String, required: true, trim: true },
    kind: {
      type: String,
      enum: [YOUTUBE_VIDEO_CATEGORY, PDF_CATEGORY],
      required: true,
    },
    item: { type: Schema.Types.ObjectId, refPath: "kind" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
