const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const youtubeVideoSchema = new Schema(
  {
    youtube_video_url: { type: String, required: true, trim: true },
    video_title: { type: String, required: true, trim: true },
    video_description: { type: String, trim: true },
    is_removed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("YoutubeVideo", youtubeVideoSchema);
