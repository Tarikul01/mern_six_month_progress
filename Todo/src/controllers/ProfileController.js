const ProfileModel=require("../models/ProfileModel");

exports.CreateProfile=async(req,res)=>{
    const data=req.body;
    const emailAddress=await ProfileModel.findOne({EmailAddress:data.EmailAddress});
    if(!emailAddress){   
    ProfileModel.create(data,(err,data)=>{
        if(err){
            res.status(404).json({"status":"Fail","data":"Registerd Failed !"})
        }else{
            res.status(200).json({"status":"success","data":data})
        }
    })
    }else{
        res.status(404).json({"status":"Fail","data":"Email address already exit!"})
    }
}


exports.SelectProfile=async (req,res)=>{
    const UserName=req.headers.username;

    const data= await ProfileModel.findOne({"UserName":UserName});
        if(!data){
            res.status(404).json({"status":"Fail","data":"Not a valid Username! "});
        }else{
            res.status(200).json({"status":"success","data":data})
        }


}

exports.UpdateProfile=async (req,res)=>{
    const UserName=req.headers.username;
    

    const data= await ProfileModel.updateOne({"UserName":UserName},{$set:req.body},{upsert:true});
        if(!data){
            res.status(404).json({"status":"Fail","data":"Not a valid Username! "});
        }else{
            res.status(200).json({"status":"success","data":data})
        }


}