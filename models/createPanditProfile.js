const mongoose = require('mongoose');

const schema = mongoose.Schema

const createPanditProfile = new schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    city:{
        type:String
    },
    mobile:{
        type:Number
    },
    pricingOnCall:{
        type:String
    },
    isAvailbale:{
        type:Boolean,
        default:true
    },
    experence:{
        type:String,
        require:true
    },
    expertRoleIn:{
        type:String,
        require:true
    },
    Image:{
        type:String
    },
    category:{
        type:String
    },
    availbaleHours:{
        startTime:{
            type:String
        },
        endTime:{
            type:String
        }
    },

},{ timestamps: true })

const createProfile = mongoose.model('createProfile', createPanditProfile);

module.exports = createProfile;
