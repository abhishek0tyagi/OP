const fetch = require('node-fetch');
const http = require('https');
const users = require('../models/userSchema')

const register =async function(req,res)
{
    console.log("hello")
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

    return res.send({
        status: true,
        message:"OTP sent"
    });
}

// const verifyOtp =async function(req,res)
// {

// }

const userCompeleteProfile = async function(req, res) {
    try{
    const {
        fullName,
        email,
        dateofBirth,
        birthTime,
        city,
        state
    }= req.body
    await users.create({fullName,email, dateofBirth, birthTime, city, state});
    res.send({
       status:true,
       message:"Filled Successfully"
    })
}catch{
    res.send({
        message:'somting went wrong',
        status: false
    })
}
}





module.exports={register,userCompeleteProfile}