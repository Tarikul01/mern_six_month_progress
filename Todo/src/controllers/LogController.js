const ProfileModel=require("../models/ProfileModel");
const jwt=require("jsonwebtoken");

exports.Login=async(req,res)=>{
    const data=req.body;
    const UserData=await ProfileModel.find({UserName:data.UserName,Password:data.Password});
    if(UserData.length>0){ 
        const tokenData={
            UserName:UserData[0].UserName,
            FirstName:UserData[0].FirstName,
            LastName:UserData[0].LastName,
            MobileNumber:UserData[0].MobileNumber,
            EmailAddress:UserData[0].EmailAddress,
        }
        const payload={
            expiresIn: '365d',
            data:tokenData,
        }
        const token=jwt.sign(payload,process.env.TOKEN_KEY);
        res.status(200).json({"status":"success","data":UserData[0],"Token":token})


    }else{
        res.status(401).json({"status":"Fail","data":"Unauthorize!"})
    }
}