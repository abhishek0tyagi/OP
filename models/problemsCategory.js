const mongoose =require('mongoose');

const schema = mongoose.Schema;

const problemCategory = new schema({
    problem:[ {type:String}]
},{ timestamps: true });


const problemsCategory = mongoose.model('problemsCategory', problemCategory);

module.exports = problemsCategory;