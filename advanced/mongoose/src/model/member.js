const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Member", memberSchema);
