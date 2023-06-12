const mongoose = require('mongoose');

const schema = mongoose.Schema;

const probandsolSchema = new schema({
    problemCategoryId: {
        type: String,
        unique: true
    },
    problem: {
        type: String
    },
    description: {
        type: String
    },
    comment: {
        type: String
    },
    solution: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })

const probandsol = mongoose.model('problemandsolution', probandsolSchema);

module.exports = probandsol;
