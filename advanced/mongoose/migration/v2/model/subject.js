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

const subjectSchema = new Schema(
  {
    subject_name: { type: String, required: true, trim: true },
    icon_url: { type: String, required: true, trim: true },
    is_removed: { type: Boolean, default: false },
    resources: [{ type: Schema.Types.ObjectId, ref: "Resource" }],
  },
  { timestamps: true }
);

const SubjectModelOne = conOne.model("Subject", subjectSchema);
const SubjectModelTwo = conTwo.model("Subject", subjectSchema);

module.exports = { SubjectModelOne, SubjectModelTwo, conOne, conTwo };
