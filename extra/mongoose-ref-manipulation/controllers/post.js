const Post = require("../model/post");
const User = require("../model/user");

exports.createPost = async (req, res, next) => {
  const post = new Post({ ...req.body, user: req.params.userId });
  try {
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    return res.status(200).json({ error: err.message });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    await post.remove();
    return res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    return res.status(200).json({ error: err.message });
  }
};
