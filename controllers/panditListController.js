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


const fetchPanditList = async function (req, res){
    try{
        const PanditData = createProfile.find({_id:id})
        if(PanditData != null || PanditData != ""){
            res.send({
                message:'getting padit data successfully',
                status_code: true
            })
        }else{
            res.send({
                message:'there is no padit',
                status_code:false
            })
        }
    }catch{
        res.send({
            message: error,
            status_code:false
        })
    }
   
}

module.exports ={registerPandit,fetchPanditList}