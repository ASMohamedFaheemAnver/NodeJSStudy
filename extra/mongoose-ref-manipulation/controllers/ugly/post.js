const Post = require("../../model/post");
const User = require("../../model/user");

exports.createPost = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  const post = new Post({ ...req.body, user: user._id });
  await post.save();
  user.posts.push(post);
  await user.save();

  return res.status(200).json(post);
};

exports.deletePost = async (req, res, next) => {
  let deletedPost;

  Post.findById(req.params.postId, (err, post) => {
    deletedPost = post;
    return post.remove((err) => {
      if (!err) {
        User.update(
          { _id: post.user },
          { $pull: { posts: post._id } },
          (err, numberAffected) => {
            console.log(numberAffected);
          }
        );
      } else {
        console.log(err);
      }
    });
  });

  return res.status(200).json(deletedPost);
};
