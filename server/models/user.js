var {mongoose, Schema} = require('../db/mongoose.js');

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = {User};