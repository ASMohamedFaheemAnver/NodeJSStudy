const User = require("../model/user");
const Bio = require("../model/bio");

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
  const user = await User.findByIdAndDelete(req.params.userId).populate(
    "posts bio"
  );
  for (let i = 0; i < user.posts.length; i++) {
    await user.posts[i].delete();
  }
  await user.bio.delete();
  res.status(200).json(user);
};

exports.createBio = async (req, res, next) => {
  const bio = new Bio({ ...req.body, user: req.params.userId });
  await bio.save();

  const user = await User.findById(req.params.userId);
  user.bio = bio;
  await user.save();

  res.status(200).json(bio);
};

exports.deleteBio = async (req, res, next) => {
  const deletedBio = await Bio.findById(req.params.bioId).populate("user");
  deletedBio.user.bio = undefined;
  await deletedBio.user.save();
  await deletedBio.delete();

  res.status(200).json(deletedBio);
};
