const jwt=require("jsonwebtoken");

const AuthVerifiedMiddleware=(req,res,next)=>{
    const token=req.headers["token_key"];
    jwt.verify(token,process.env.TOKEN_KEY,(err,data)=>{
        if(err){
            res.status(404).json({"status":"Failed","data":"Unauthorized !"});
        }else{
            req.headers.username=data.data.UserName;
            next();
        }
    })
}

module.exports=AuthVerifiedMiddleware;