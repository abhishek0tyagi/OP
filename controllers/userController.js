const register =async function(req,res)
{
    const {phone,password}=req.body;
    if(phone=="" || phone == undefined)
    {
        return res.send({
            status_code:true,
            message:"phone number required"
        })
    }
    res.send({
        status_code:true,
        message:"1234"
    })
}

module.exports={register}