const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

router.post("/create-post/:userId", postController.createPost);
router.delete("/delete-post/:postId", postController.deletePost);

module.exports = router;
