const User=require("../../models/user");
const bcrypt=require("bcryptjs");
const  jwt=require("jsonwebtoken");


const Register=async (req,res)=>{

    try {
        const {username,email,password}=req.body;

        // Check user exits or not 
        const userExits= await User.exists({email:email});
        if(userExits){
            return res.status(409).send("E-mail already in use! ");
        }


        // // encrypt password 
        const encryptPassword=await bcrypt.hash(password,10);
 
        
        // // Create user documents
        const user=await User.create({
            username,
            email:email.toLowerCase(),
            password:encryptPassword,
        });

        // // create JWT token
        const token=jwt.sign({
            userId:user._id,
            email
    },
            process.env.TOKEN_KEY,{
            expiresIn:"24h",
        });

        res.status(201).json({
            userDetails:{
                email:user.email,
                token:token,
                username:user.username
            },
        })
        
    } catch (error) {
        return res.status(500).send("Error occured. Please try again! ");
    }

}
 module.exports=Register;
