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
  let deletedPost;

  return Post.findById(req.params.postId, (err, post) => {
    deletedPost = post;
    return post.remove((err) => {
      if (!err) {
        User.update(
          { _id: post.user },
          { $pull: { posts: post._id } },
          (err, numberAffected) => {
            console.log(numberAffected);
            return res.status(200).json(numberAffected);
          }
        );
      } else {
        console.log(err);
      }
    });
  });
};
