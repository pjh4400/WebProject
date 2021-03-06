const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const Hashtag = require("../models/Hashtag");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

/* READ */
router.get("/", async (req, res, next) => {
  try {
    await Post.find({})
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

/* 게시글 본문 검색 기능 */
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
    }).then((user) => {
      Post.find({
        author: user._id,
      })
        .populate("author")
        .then((post) => {
          res.json({ success: true, post: post });
        });
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 해시태그 검색 */
router.get("/searchHashtag/:hashtag", async (req, res, next) => {
  try {
    await Hashtag.findOne({
      hashtag: req.params.hashtag,
    }).then((data) => {
      if (!data)
        res.json({ success: false, message: "해당 해시태그가 없습니다." });
      else
        Post.find({ hashtags: data._id })
          .populate({
            path: "author",
          })
          .then((post) => {
            res.json({ success: true, post: post });
          });
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* CREATE */
router.post("/", isLoggedIn, async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const hashtags = content.match(/#[^\s#]+/g);
    if (hashtags) {
      let realtags = [];
      await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOne({
            hashtag: tag.slice(1).toLowerCase(),
          }).then( async (data) => {
            if (data) {
              realtags.push(data._id);
            } else {
              await Hashtag.create({
                hashtag: tag.slice(1).toLowerCase(),
              }).then((result) => {
                realtags.push(result._id);
              });
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

/* UPDATE */
router.put("/", isLoggedIn, async (req, res, next) => {
  const { postID, title, content } = req.body;
  if (postID) {
    const hashtags = content.match(/#[^\s#]+/g);
    console.log("해시태그: " + hashtags);
    let realtags = [];
    if (hashtags) {
      await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOne({
            hashtag: tag.slice(1).toLowerCase(),
          }).then( async (data) => {
            if (data) {
              realtags.push(data._id);
            } else {
              await Hashtag.create({
                hashtag: tag.slice(1).toLowerCase(),
              }).then((result) => {
                realtags.push(result._id);
              });
            }
          })
        )
      );
    }
    Post.updateOne(
      { _id: postID, author: req.user._id },
      {
        $set: {
          title: title,
          content: content,
          hashtags: realtags,
        },
      },
      (err, result) => {
        console.log(result);
        res.json({ success: true, message: "수정되었습니다." });
      }
    );
  } else {
    next("아이디없음");
  }
});

/* DELETE */
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
