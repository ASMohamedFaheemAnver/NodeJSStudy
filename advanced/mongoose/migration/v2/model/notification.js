const mongoose = require("mongoose");
const {
  YOUTUBE_VIDEO_CATEGORY,
  PDF_CATEGORY,
} = require("../../../constants/category");

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

const NotificationModelOne = conOne.model("Notification", notificationSchema);
const NotificationModelTwo = conTwo.model("Notification", notificationSchema);

module.exports = { NotificationModelOne, NotificationModelTwo, conOne, conTwo };
