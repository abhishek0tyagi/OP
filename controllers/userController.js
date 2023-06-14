//npm
const fetch = require('node-fetch');
const http = require('https');
var fs = require("fs");
const users = require('../models/userSchema');
const appOtp = require('../models/appOtpSchema');
var multer = require("multer");
var upload = multer();
const excelToJson = require('convert-excel-to-json');


//sdk setup
const register = async (req, res) => {
    try {
        const phone = req.params.phone;
        if (phone != "1234567890") {
            return res.send({
                message: "Incorrect testing number!",
                status: false
            })
        }
        const userData = await users.findOne({ phone });
        if (userData) {
            await appOtp.create({ phone, email: "", otp: "1234", description: "Login OTP!" });
            res.send({
                message: "OTP sent!",
                status: true
            })
        } else {
            await users.create({ fullName: "", phone, email: "", dateofBirth: "", city: "", state: "" });
            await appOtp.create({ phone, email: "", otp: "1234", description: "Login OTP!" });
            res.send({
                message: "OTP sent!",
                status: true
            });
        }
    } catch (error) {
        res.send({
            message: "Something went wrong!",
            status: false
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
                message: "User not found!",
                status: false,
                userId: "",
                token:""
            })
        }
        const userOtp = await appOtp.findOne({ phone });
        if (!userOtp) {
            return res.send({
                message: "Incorrect number!",
                status: false,
                userId: "",
                token:""
            })
        }
        if (userOtp.otp === otp) {
            res.send({
                message: "OTP Verified!",
                status: true,
                userId: userData._id,
                token:""
            })
        } else {
            res.send({
                message: "Incorrect OTP",
                status: false,
                userId: "",
                token:""
            })
        }
    } catch (error) {
        console.log("Error in verify otp: ",error);
        res.send({
            message: "Something went wrong!",
            status: false,
            userId: "",
            token:""
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

const exceltoJson = async function(req,res)
{
    // var excelData=await fs.readFile('uploads/iplDataTeam.xlsx', 'utf8',async function(err, data){
    // var data1=excelData.split('.')
        // Display the file content
       
 
const result = excelToJson({
    sourceFile: 'uploads/iplDataTeam.xlsx'
});   
    console.log('readFile called');
    res.send(result)
}


module.exports = { register, verifyPhoneOtp, userCompeleteProfile, exceltoJson};
