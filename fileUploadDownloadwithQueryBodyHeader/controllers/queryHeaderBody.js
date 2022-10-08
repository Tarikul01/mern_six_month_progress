exports.getData=(req,res)=>{

    try {
        const data={};
        if(req.body){
            data.body=req.body;
        }
        if(req.headers){
            data.headers=req.headers;
        }
        if(req.query){
            data.quer=req.query;
        }
        
    res.status(200).json({"msg":"Success","data":data});
    } catch (error) {
        res.status(404).json({"msg":"Fail","data":"Not found !"});

    }
}