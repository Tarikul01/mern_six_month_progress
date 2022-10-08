const path=require("path");
exports.downloadFile=(req,res)=>{
    // console.log(`../${__dirname}`);
    // console.log(path.dirname)
    res.download('./uploads/img.jpg',(err)=>{
        res.status(500).json({"Error":err.message});
    })
}