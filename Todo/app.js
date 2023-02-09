const express=require("express");
const app=express();
const router=require("./src/routers/api");
const mongoose=require("mongoose");

//Security middleware import
const rateLimit=require("express-rate-limit");
const helmet=require("helmet");
const mongoSanitize=require("express-mongo-sanitize");
const xss=require("xss-clean");
const hpp=require('hpp');
const cors=require("cors");
const bodyParser=require('body-parser');

//security middleware implement

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Request rate-limiting
const limiter=rateLimit({
    windowMs:15*60*1000,
    max:100,
});
app.use(limiter);

// Database connections 
const options={user:"",pass:"",autoIndex:true}
mongoose.connect(process.env.MONGO_URL,options,(err)=>{
    if(!err){
        console.log("DB connection success");
    }else{
        console.log("Db connection fails!");
    }
})


app.use("/api/v1",router);



//Undefine route

app.use("*",(req,res)=>{
    res.status(404).json({"status":"Fail","data":"URL Not Found !"});
})





module.exports=app;