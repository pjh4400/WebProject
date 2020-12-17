const mongoose = require('mongoose');

const { Schema } = mongoose;
const HashtagSchema = new Schema({
    hashtag: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model('Hashtag', HashtagSchema);
