const mongoose=require("mongoose");

const userSchema= mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    id:{type:String}
},{versionKey:false})
const User=mongoose.model('User',userSchema);

module.exports=User;