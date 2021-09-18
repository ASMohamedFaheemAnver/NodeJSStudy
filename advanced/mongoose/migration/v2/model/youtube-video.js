const mongoose = require("mongoose");

const conOne = mongoose.createConnection(process.env.MONGODB_URL_FROM, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const conTwo = mongoose.createConnection(process.env.MONGODB_URL_TO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

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

const YoutubeVideoOne = conOne.model("YoutubeVideo", youtubeVideoSchema);
const YoutubeVideoTwo = conTwo.model("YoutubeVideo", youtubeVideoSchema);

module.exports = { YoutubeVideoOne, YoutubeVideoTwo, conOne, conTwo };
