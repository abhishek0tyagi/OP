const mongoose = require('mongoose');

const schema = mongoose.Schema;

const policeReportSchema = new schema({
    Document_Type: {
        type: String,
    },
    Year: {
        type: String
    },
    Doc_NO: {
        type: String
    },
    Unique_Code:{
        type:String
    }
}, { timestamps: true })

const policeReport = mongoose.model('policeReport', policeReportSchema);

module.exports = policeReport;
