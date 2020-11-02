const User = require("../model/user");
const Post = require("../model/post");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("posts");
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
  const user = await User.findByIdAndDelete(req.params.userId).populate(
    "posts"
  );
  for (let i = 0; i < user.posts.length; i++) {
    await user.posts[i].delete();
  }
  res.status(200).json(user);
};
