const mongoose = require('mongoose');

const schema = mongoose.Schema

const createPanditProfile = new schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        Type:String,
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
        type:Boolean
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
        startTime:String,
        endTime:String
    },

},{ timestamps: true })

const createProfile = mongoose.model('createProfile', createPanditProfile);

module.exports = createProfile;
