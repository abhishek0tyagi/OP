const mongoose = require('mongoose');

const schema = mongoose.Schema;

const appOtpSchema = new schema({
    phone: {
        type: String
    },
    email: {
        type: String,
    },
    otp: {
        type: String,
    },
    description: {
        type: String
    }

}, { timestamps: true })

const appOtp = mongoose.model('appOtp', appOtpSchema);

module.exports = appOtp;
