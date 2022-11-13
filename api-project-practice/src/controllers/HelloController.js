exports.HelloGet=(req,res)=>{
    res.status(200).json({"msg":"successGet","Data":"Show PostData"});
}
exports.HelloPost=(req,res)=>{
    res.status(200).json({"msg":"SuccessPost","Data":req.body});
}