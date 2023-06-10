const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    fullName:{
        type:String
    },
    phone:{
        type:Number
    },
    email:{
        type:String
    },
    dateOfBirth:{
        type:Number
    },
    timeofBirth:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:{
            String
        }
    }

},{ timestamps: true })

const users = mongoose.model('users', userSchema);

module.exports = users;
