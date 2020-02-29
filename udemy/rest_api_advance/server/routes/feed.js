const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed");
const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/post
router.post(
  "/post",
  isAuth,
  [
    (body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 }))
  ],
  feedController.createPost
);

// GET /feed/post/:postId
router.get("/post/:postId", isAuth, feedController.getPost);

// PUT /feed/post/:postId
router.put(
  "/post/:postId",
  isAuth,
  [
    body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.updatePost
);

// DELETE /feed/post/:postId
router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;
