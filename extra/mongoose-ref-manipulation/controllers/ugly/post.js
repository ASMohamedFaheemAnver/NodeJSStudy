const Post = require("../model/post");
const User = require("../model/user");

exports.createPost = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  const post = new Post({ ...req.body, user: user._id });
  await post.save();
  user.posts.push(post);
  await user.save();

  return res.status(200).json(post);
};

exports.deletePost = async (req, res, next) => {
  //console.log(req.params.postId);
  const deletedPost = await Post.findByIdAndDelete(req.params.postId);
  //console.log(deletedPost);
  const user = await User.findById(deletedPost.user);
  //console.log(deletedPost._id);
  user.posts.pull(req.params.postId);
  //console.log(user.posts);
  user.save();
  return res.status(200).json(deletedPost);
};
