const joi=require("joi");

const schema={
    registerSchema:joi.object({
        username:joi.string(),
        password:joi.string().min(3).max(9),
        email:joi.string().email()
    }),
    
    loginSchema:joi.object({
        password:joi.string().min(3).max(9),
        email:joi.string().email()
    })


}
module.exports=schema;