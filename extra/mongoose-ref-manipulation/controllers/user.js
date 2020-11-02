const User = require("../model/user");
const Post = require("../model/post");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("post");
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
