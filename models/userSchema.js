const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    fullName: {
        type: String
    },
    phone: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    dateofBirth: {             //dd-mm-yyyy
        type: String
    },
    time:{
        type:String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const users = mongoose.model('users', userSchema);

module.exports = users;
