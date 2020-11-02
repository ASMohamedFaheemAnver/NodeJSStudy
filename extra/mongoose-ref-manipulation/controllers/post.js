const Post = require("../model/post");
const User = require("../model/user");

exports.createPost = async (req, res, next) => {
  // const user = await User.findById(req.params.userId);
  const post = new Post({ ...req.body, user: req.params.userId });
  post.save().then((pPost) => {
    return User.findById(pPost.user, (err, user) => {
      if (user) {
        user.posts.push(pPost);
        user.save();
      }
    });
  });
  // user.posts.push(post);
  // await user.save();
  return res.status(200).json(post);
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
