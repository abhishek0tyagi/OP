//npm
const fetch = require('node-fetch');
const http = require('https');
const xlsx = require('xlsx')
var fs = require("fs");
const path = require('path');
const users = require('../models/userSchema');
const appOtp = require('../models/appOtpSchema');
var multer = require("multer");
var upload = multer();
const excelToJson = require('convert-excel-to-json');
const policeReport = require('../models/policeReport')


//sdk setup
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: 'AKIASNPTUT44GCQC7UMV',
    secretAccessKey: '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',
});
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
                token: ""
            })
        }
        const userOtp = await appOtp.findOne({ phone });
        if (!userOtp) {
            return res.send({
                message: "Incorrect number!",
                status: false,
                userId: "",
                token: ""
            })
        }
        if (userOtp.otp === otp) {
            res.send({
                message: "OTP Verified!",
                status: true,
                userId: userData._id,
                token: ""
            })
        } else {
            res.send({
                message: "Incorrect OTP",
                status: false,
                userId: "",
                token: ""
            })
        }
    } catch (error) {
        console.log("Error in verify otp: ", error);
        res.send({
            message: "Something went wrong!",
            status: false,
            userId: "",
            token: ""
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

const exceltoJson = async function (req, res) {
    // var excelData=await fs.readFile('uploads/iplDataTeam.xlsx', 'utf8',async function(err, data){
    // var data1=excelData.split('.')
    // Display the file content
    try {
        setTimeout(async() => {
            if(req.file == undefined)
            {
                return res.send("gaand mra le,phirse bhej")
            }
            var path = 'uploads/' + req.file.filename;
            var result = excelToJson({
                sourceFile: path
            });
            var arrData=[];
            // var key1=result.Worksheet[0].A;
            // var key1="Document_Type"
            // var key2=result.Worksheet[0].B;
            // var key3=result.Worksheet[0].C;
            console.log(result)
            
            if(result.Worksheet!=undefined)
            {
                var w=result.Worksheet; 
            console.log(w)
            for(let i=1;i<w.length;i++)
            {   
                let val1=result.Worksheet[i].A;
                let val2=result.Worksheet[i].B;
                let val3=result.Worksheet[i].C;
                let val4 = result.Worksheet[i].D;
                arrData.push({Document_Type:val1.toString(),Year:val2.toString(),Doc_NO:val3.toString(), Unique_Code:val4.toString(), PdfUrl:""});
            }
            await policeReport.insertMany(arrData)
            return res.send({
                status_code:true,
                message:"successfully uploaded"
            })
            }
            // var w=result.Worksheet; 
            var w=result.Sheet1;
            console.log(w)
            for(let i=1;i<w.length;i++)
            {   
                let val1=result.Sheet1[i].A;
                let val2=result.Sheet1[i].B;
                let val3=result.Sheet1[i].C;
                arrData.push({Document_Type:val1.toString(),Year:val2.toString(),Doc_NO:val3.toString()})
            }
            await policeReport.insertMany(arrData)
            res.send({
                status_code:true,
                message:"successfully uploaded"
            })
        }, "1000");
    }
    catch (error) {
        res.send(error)
    }
}

const exceltoJSONDeepanshu = async (req, res) => {
    try {
        const bufferData = req.body.bufferData;
        console.log(bufferData);
        const parsed = Buffer.from(bufferData);
        const workbook = xlsx.read(parsed, { type: 'buffer' });
        // console.log("workbook: ", workbook);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        res.send({
            Message: "Excel Data",
            data: jsonData
        });
    } catch (error) {
        console.log(error)
        res.send({
            Message: "Something went wrong!"
        })
    }
}

const uploadImage = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.send({ message: "Some Resource not found!", staus: false })
        }
        const Unique_Code = (file.originalname.split('.'))[0];
        // console.log(Unique_Code, typeid(Unique_Code))
        const data = await policeReport.findOne({ Unique_Code });
        console.log(data);
        if (!data) {
            return res.send({
                message: "Id not available!",
                status: false
            })
        }
        // const imagePath = path.join(__dirname, '../constants/images');
        // fs.promises.writeFile(`${imagePath}/${file.originalname}`, file.buffer);
        const uploadParams = {
            Bucket: 'uploadimagepolicestation',
            Key: `${file.originalname}`,
            Body: file.buffer,
        };
        const uploadedImage = await s3.upload(uploadParams).promise();
        if (uploadedImage.Location) {
            await policeReport.findOneAndUpdate({ Unique_Code }, { $set: { PdfUrl: uploadedImage.Location } });
            res.send({
                message: "Pdf uploaded!",
                status: true,
            })
        } else {
            res.send({
                message: "Error in uploading pdf!",
                status: false
            })
        }

    } catch (error) {
        console.log(error)
        res.send({
            message: "Something went wrong!",
            status: false,
            path: ""
        })
    }
}

const getPoliceData = async function (req, res) {
    var data = await policeReport.find();
    res.send({count:data.length,data})
}

const dashboardCount = async function (req, res) {
    var data = await policeReport.find().count();
    res.send({count:data})
}

module.exports = { dashboardCount, getPoliceData, register, verifyPhoneOtp, userCompeleteProfile, exceltoJson, exceltoJSONDeepanshu, uploadImage };
