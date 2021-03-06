const { validationResult } = require("express-validator");

const Post = require("../model/post");
const User = require("../model/user");

const fs = require("fs");
const path = require("path");

const io = require("../socket");

exports.getPosts = async (req, res, next) => {
  const perPage = 2;
  const currentPost = req.query.page || 1;

  try {
    const totalItems = await Post.find().countDocuments();

    const posts = await Post.find()
      .populate("creator")
      .sort({ createdAt: -1 })
      .skip((currentPost - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Fetched posts!",
      posts: posts,
      totalItems: totalItems
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect!");
    error.statusCode = 422;
    throw error;
    // return res.status(422).json({
    //   message: "Validation failed, entered data is incorrect!",
    //   errors: errors.array()
    // });
  }
  const title = req.body.title;
  const content = req.body.content;

  if (!req.file) {
    const error = new Error("No image provided!");
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = req.file.path;
  let creator;

  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId
  });
  post
    .save()
    .then(result => {
      oResult = result;
      return User.findById(req.userId);
    })
    .then(user => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then(result => {
      io.getIO().emit("posts", {
        action: "create",
        post: { ...post._doc, creator: { _id: req.userId, name: creator.name } }
      });
      res.status(201).json({
        message: "Post create successfully!",
        post: post,
        creator: { _id: creator._id, name: creator.name }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error("Coult not find post!");
        error.statusCode = 400;
        throw error;
      }
      res.status(200).json({ message: "Post fetched!", post: post });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect!");
    error.statusCode = 422;
    throw error;
  }
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = null;

  if (req.file) {
    imageUrl = req.file.path;
  }

  // if (!imageUrl) {
  //   const error = new Error("No file picked!");
  //   error.statusCode = 422;
  //   throw error;
  // }

  Post.findById(postId)
    .populate("creator")
    .then(post => {
      if (!post) {
        const error = new Error("Coult not find post!");
        error.statusCode = 400;
        throw error;
      }

      if (post.creator._id.toString() !== req.userId.toString()) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
      }

      if (!imageUrl) {
        imageUrl = post.imageUrl;
      }

      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;

      return post.save();
    })
    .then(result => {
      io.getIO().emit("posts", { action: "update", post: result });
      res.status(200).json({ message: "Post updated!", post: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error("Coult not find post!");
        error.statusCode = 400;
        throw error;
      }
      if (post.creator.toString() !== req.userId.toString()) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
      }
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.posts.pull(postId);
      return user.save();
    })
    .then(_ => {
      io.getIO().emit("posts", { action: "delete", post: postId });
      res.status(200).json({ message: "Deleted!" });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = filePath => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, err => {
    if (err) {
      console.log(err);
    }
  });
};
