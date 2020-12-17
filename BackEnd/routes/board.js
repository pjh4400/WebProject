const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const Hashtag = require("../models/Hashtag");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    Post.find({})
      .populate({
        path: "author",
      })
      .exec((err, data) => {
        res.status(201).json(data);
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 게시글의 검색 기능 */
router.get("/searchContent/:content", async (req, res, next) => {
  if (req.params.content) {
    try {
      Post.find({
        content: { $regex: req.params.content },
      })
        .populate("author")
        .then((post) => {
          console.log(post);
          res.json({ success: true, post: post });
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    } catch (err) {
      console.error(err);
      next(err);
    }
  } else {
  }
});

/* 작성자 ID 로 검색 */
router.get("/searchID/:id", async (req, res, next) => {
  try {
    User.findOne({
      id: req.params.id,
    })
      .then((user) => {
        Post.find({
          author: user._id,
        })
          .populate("author")
          .then((post) => {
            res.json({ success: true, post: post });
          })
          .catch((err) => {
            console.error(err);
            next(err);
          });
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 게시글 작성 */
router.post("/", isLoggedIn, async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    if (hashtags) {
      let realtags = [];
      await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOne({
            hashtag: tag.slice(1).toLowerCase(),
          }).then((data) => {
            if (data) {
              realtags.push(data._id);
            } else {
              Hashtag.create({ hashtag: tag.slice(1).toLowerCase() }).then(
                (result) => {
                  realtags.push(result._id);
                }
              );
            }
          })
        )
      );
      await Post.create({
        author: req.user._id,
        title: title,
        content: content,
        hashtags: realtags,
      });
    } else {
      await Post.create({
        author: req.user._id,
        title: title,
        content: content,
      });
    }
    res.status(201).json({ success: true, message: "등록되었습니다." });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/* 게시글 수정 */
router.put("/", isLoggedIn, (req, res, next) => {
  console.log("===========================================");
  const { postID, title, content } = req.body;
  if (postID) {
    Post.updateOne(
      { _id: postID, author: req.user._id },
      {
        $set: {
          title: title,
          content: content,
        },
      },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
        res.json({ success: true, message: "수정되었습니다." });
      }
    );
  } else {
    next("아이디없음");
  }
});

/* 게시글 삭제 */
router.delete("/:id", isLoggedIn, (req, res, next) => {
  if (req.params.id) {
    Post.deleteOne(
      { _id: req.params.id, author: req.user._id },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.json({ success: true, message: "삭제되었습니다." });
      }
    );
  } else {
    next("아이디없음");
  }
});

module.exports = router;
