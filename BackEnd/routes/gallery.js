const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Gallery = require("../models/Gallery");
const Hashtag = require("../models/Hashtag");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();


router.get("/", async (req, res, next) => {
  try {
    Gallery.find({})
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

fs.readdir("uploads", (error) => {
  if (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/img", isLoggedIn, upload.single("img"), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), async (req, res, next) => {
  const { img, content } = req.body;
  console.log(req.body);
  try {
    const hashtags = content.match(/#[^\s#]+/g);
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
      const gallery = Gallery.create({
        author: req.user._id,
        img: img.url,
        content: content,
        hashtags: realtags,
      });
    } else {
      const gallery = Gallery.create({
        author: req.user._id,
        img: img.url,
        content: content,
      });
    }
    //const result = await Gallery.populate(gallery, { path: "author" });
    res.status(201).json({ success: true, message: "등록되었습니다." });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

/* 해시태그 검색 */
router.get("/search/:hashtag", async (req, res, next) => {
  try {
    Hashtag.findOne({
      hashtag: req.params.hashtag,
    })
      .then((hashtag) => {
        Gallery.find({ "hashtags": hashtag._id})
       . populate({
          path: "author",
        })
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



/* 게시글 수정 */
router.put("/:id", isLoggedIn, (req, res, next) => {
  console.log(req.params.id);
  if (req.params.id) {
    console.log(req.params.postID);
    /*
    Gallery.updateOne(
      { _id: req.params.postID, author: req.user._id },
      {
        $set: {
          title: req.params.title,
          content: req.params.content,
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
    */
  } else {
    next("아이디없음");
  }
});

/* 게시글 삭제 */
router.delete("/:id", isLoggedIn, (req, res, next) => {
  console.log("삭제");
  console.log(req.params.id);
  if (req.params.id) {
    Gallery.deleteOne(
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