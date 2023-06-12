const fetch = require('node-fetch');
const http = require('https');

const users = require('../models/userSchema');
const appOtp = require('../models/appOtpSchema');

const register = async (req, res) => {
    try {
        const phone = req.params.phone;
        if (phone != "1234567890") {
            return res.send({
                Message: "Incorrect testing number!",
                Status: false
            })
        }
        const userData = await users.findOne({ phone });
        if (userData) {
            await appOtp.create({ phone, email: "", otp: "1234", description: "Login OTP!" });
            res.send({
                Message: "OTP sent!",
                Status: true
            })
        } else {
            await users.create({ fullName: "", phone, email: "", dateofBirth: "", city: "", state: "" });
            await appOtp.create({ phone, email: "", otp: "1234", description: "Login OTP!" });
            res.send({
                Message: "OTP sent!",
                Status: true
            });
        }
    } catch (error) {
        res.send({
            Message: "Something went wrong!",
            Status: false
        })
    }
    // let mobile = '917310042077';
    // let template_idMsg='647f75b1d6fc052fda462523';
    // let authkeyMsg91='398284AQ1EfNFW647f7502P1';
    // var otp = 1235;
    // var phone = `91${mobile}`;

    // var path=`https://api.msg91.com/api/v5/otp?template_id=${template_idMsg}&mobile=${phone}&authkey=${authkeyMsg91}&otp=${otp}`;

    // const options = { method: 'GET', headers: { accept: 'application/json' } , hostname: 'api.msg91.com' };
    // await fetch(path, options)
    //     .then((res) => res.json())
    //     .then((json) => {
    //        console.log(json)
    //     })
}

const verifyPhoneOtp = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        const userData = await users.findOne({ phone });
        if (!userData) {
            return res.send({
                Message: "User not found!",
                Status: false,
                UserId: ""
            })
        }
        const userOtp = await appOtp.findOne({ phone });
        if (!userOtp) {
            return res.send({
                Message: "Incorrect number!",
                Status: false,
                UserId: ""
            })
        }
        if (userOtp.otp === otp) {
            res.send({
                Message: "OTP Verified!",
                Stauts: true,
                UserId: userData._id
            })
        } else {
            res.send({
                Message: "Incorrect OTP",
                Status: false,
                UserId: ""
            })
        }
    } catch (error) {
        res.send({
            Message: "Something went wrong!",
            Status: false,
            UserId: ""
        })
    }
}

// const verifyOtp =async function(req,res)
// {

// }

const userCompeleteProfile = async function (req, res) {
    try {
        const {
            fullName,
            email,
            dateofBirth,
            birthTime,
            city,
            state
        } = req.body
        await users.create({ fullName, email, dateofBirth, birthTime, city, state });
        res.send({
            status: true,
            message: "Filled Successfully"
        })
    } catch {
        res.send({
            message: 'somting went wrong',
            status: false
        })
    }
}





module.exports = { register, verifyPhoneOtp, userCompeleteProfile };
