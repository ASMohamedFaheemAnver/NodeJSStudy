const mongoose = require("mongoose");
const {
  ADMIN_CATEGORY,
  SUPER_ADMIN_CATEGORY,
} = require("../../../constants/category");

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

module.exports = adminSchema;
