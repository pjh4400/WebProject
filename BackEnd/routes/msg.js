const express = require("express");
const { isLoggedIn } = require("./middlewares");
const User = require("../models/User");
const Message = require("../models/Message");

const router = express.Router();

/* 메세지 확인하기 */
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    await Message.find({
      receiver: req.user._id,
    })
      .populate({
        path: "sender",
      })
      .exec((err, data) => {
        console.log(data);
        res.status(201).json(data);
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 메세지 보내기 */
router.post("/", isLoggedIn, async (req, res, next) => {
  const { receiver, content } = req.body;
  try {
    await User.findOne({
      id: receiver,
    }).exec((err, user) => {
      if(user) {
        const message = new Message({
            sender: req.user._id,
            receiver: user._id,
            content: content,
          });
          message.save();
          res.status(201).json({ success: true, message: "전송되었습니다." });
      } else {
        res.status(201).json({ success: false, message: "수신자 ID가 없습니다." });
      }
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
