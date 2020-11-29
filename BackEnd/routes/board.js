const express = require("express");
const Post = require("../models/Post");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  const { id, title, content, hashtag } = req.body;
  try {
    const post = await Post.create({
      author: id,
      title: title,
      content: content,
      hashtag: hashtag,
    });
    const result = await Post.populate(post, { path: "author" });
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
