const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
		type: String,
		required: true,
		trim: true,
	},
})
userSchema.plugin(passportLocalMongoose, { usernameField: 'id' });


module.exports = mongoose.model('User', userSchema);