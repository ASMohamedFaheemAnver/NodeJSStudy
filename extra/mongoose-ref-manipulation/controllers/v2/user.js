const User = require("../model/user");
const Bio = require("../model/bio");
const Post = require("../model/post");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("posts bio");
    res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(200).json({ message: e.message });
  }
};

exports.createUser = async (req, res, next) => {
  const user = new User({ ...req.body });
  await user.save();

  res.status(200).json(user);
};

exports.deleteUser = async (req, res, next) => {
  return User.findById(req.params.userId, (err, user) => {
    if (!err) {
      return user.deleteOne((err) => {
        if (!err) {
          Post.deleteOne({ _id: { $in: user.posts } }, (err) => {
            if (!err) {
              Bio.deleteOne({ _id: user.bio }, (err) => {
                if (!err) {
                  res.status(200).json(user);
                }
              });
            }
          });
        }
      });
    } else {
      console.log(err.message);
    }
  });
};

exports.createBio = async (req, res, next) => {
  const bio = new Bio({ ...req.body, user: req.params.userId });

  bio.save().then((aBio) => {
    return User.updateOne(
      { _id: req.params.userId },
      { bio: aBio },
      (err, user) => {
        res.status(200).json(bio);
      }
    );
  });
};

exports.deleteBio = async (req, res, next) => {
  return Bio.deleteOne({ _id: req.params.bioId }, (err) => {
    if (!err) {
      User.updateOne(
        { bio: req.params.bioId },
        { $unset: { bio: 1 } },
        (err, raw) => {
          if (!err) {
            res.status(200).json(raw);
          }
        }
      );
    }
  });
};
