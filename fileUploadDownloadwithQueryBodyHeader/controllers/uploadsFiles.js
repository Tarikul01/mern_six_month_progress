exports.uploadFile=(req,res)=>{

    try {
        
    res.status(200).json({"msg":"Files Upload Success!"});
    } catch (error) {
        res.status(404).json({"msg":"Fail","error":error.message});

    }
}