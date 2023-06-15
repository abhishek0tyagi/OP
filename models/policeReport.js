const mongoose = require('mongoose');

const schema = mongoose.Schema;

const policeReportSchema = new schema({
    documentType: {
        type: String,
    },
    year: {
        type: String
    },
    docNo: {
        type: String
    },
    imageUrl:{
        type:String
    }
}, { timestamps: true })

const policeReport = mongoose.model('policeReport', policeReportSchema);

module.exports = policeReport;
