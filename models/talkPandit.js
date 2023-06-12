const mongoose = require('mongoose');

const schema = mongoose.Schema;

const talkPanditSchema = mngoose.schema({
category:[{
     type:String,
     is_called: Boolean, 
}],
},{ timestamps: true })

const panditTalk = mongoose.model('panditTalk', talkPanditSchema);

module.exports = panditTalk;