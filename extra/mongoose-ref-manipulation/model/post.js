const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", memberSchema);
