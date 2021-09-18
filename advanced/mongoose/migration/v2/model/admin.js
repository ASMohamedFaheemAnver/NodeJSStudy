const mongoose = require("mongoose");
const {
  ADMIN_CATEGORY,
  SUPER_ADMIN_CATEGORY,
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

const adminSchema = new Schema(
  {
    user_name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [ADMIN_CATEGORY, SUPER_ADMIN_CATEGORY],
      required: true,
      trim: true,
    },
    message_token: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_removed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AdminModelOne = conOne.model("Admin", adminSchema);
const AdminModelTwo = conTwo.model("Admin", adminSchema);

module.exports = { AdminModelOne, AdminModelTwo, conOne, conTwo };
