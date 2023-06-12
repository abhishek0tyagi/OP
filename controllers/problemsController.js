const problemsCat = require('../models/problemsCategory');

const getProblemsCatogary = async function(req, res){
    
    try{
        const data = await problemsCat.find({problem:problem})
        console.log(data)
        if(data != null){
            res.send({
                message:'get problems catogary successfully',
                status:true
            })
        }else{
                res.send({
                    message:'getting error in fatching problems',
                    status: false
                })
        }

    }catch{
        res.send({
            message:'Somthing went wrong',
            status: false
        })
    }
}

const createCategory = async function(req,res){
    
}

module.exports= {getProblemsCatogary}