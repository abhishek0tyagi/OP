const createProfile = require('../models/createPanditProfile')



const registerPandit = async function(req, res){
    const{
        firstName,
        lastName,
        city,
        mobile,
        pricingOnCall,
        isAvailbale,
        experence,
        expertRoleIn,
        Image,
        category,
        availbaleHours
    }=req.body
    try{
        const data = await createProfile.create({firstName:firstName,lastName:lastName,city:city,mobile:mobile,pricingOnCall:pricingOnCall,isAvailbale:isAvailbale,experence:experence,expertRoleIn:expertRoleIn,Image:Image,category:category,availbaleHours:availbaleHours})
        res.send({
            message:'register pandit successfully',
            status_code:true
        })
    }catch{

    }
}