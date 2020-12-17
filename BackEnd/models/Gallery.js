const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;
const GallerySchema = new Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  img: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  hashtags: [{
    type: ObjectId,
    ref: "Hashtag",
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Gallery", GallerySchema);
