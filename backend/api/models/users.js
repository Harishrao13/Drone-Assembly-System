const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Please provide an email'],
        unique:[true, 'Email already exists'],
        // maxlength
        trim:true
    },

    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters'],
    },

    isadmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('users', UserSchema);