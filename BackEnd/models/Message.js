const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
    Types: { ObjectId },
  } = Schema;
const MessageSchema = new Schema({
    sender: {
        type: ObjectId,
        required: true,
        ref: "User",
    },
    receiver: {
        type: ObjectId,
        required: true,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model('Message', MessageSchema);
