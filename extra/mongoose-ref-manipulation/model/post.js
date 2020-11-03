const mongoose = require("mongoose");
const User = require("./user");

const Schema = mongoose.Schema;

const postSchema = new Schema({
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

postSchema.pre("save", function (next) {
  const newPost = this;

  User.updateOne(
    { _id: this.user },
    { $push: { posts: newPost } },
    (err, raw) => {
      if (!err) {
        if (raw.n == 1) {
          console.log(raw);
        } else {
          next(new Error("User doesn't exist!"));
        }
      } else {
        console.log(err.message);
      }
      next();
    }
  );
});

postSchema.pre("remove", function (next) {
  const oldPost = this;
  User.updateOne(
    { _id: this.user },
    { $pull: { posts: oldPost._id } },
    (err, raw) => {
      if (!err) {
        console.log(raw);
        if (raw.n == 1) {
        } else {
          next(
            new Error("Owner of the post doesn't exist or post doesn't exist!")
          );
        }
      } else {
        console.log(err.message);
      }
      next();
    }
  );
});

module.exports = mongoose.model("Post", postSchema);
