const mongoose=require("mongoose");

const profileSchema=mongoose.Schema({
    UserName:{type:String,unique:true},
    Password:{type:String},
    FirstName:{type:String},
    LastName:{type:String},
    MobileNumber:{type:String},
    EmailAddress:{type:String},

},{versionKey:false});

const ProfileModel=mongoose.model("profile",profileSchema);
module.exports=ProfileModel;