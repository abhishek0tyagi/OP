const mongoose = require('mongoose');

const schema = mongoose.Schema;

const problemCategory = new schema({
    problemCategoryName: {
        type: String,
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const problemsCategory = mongoose.model('problemsCategory', problemCategory);

module.exports = problemsCategory;