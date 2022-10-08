const express=require("express");
const router = require("./src/routes/api");


const app= new express();

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


app.use("/api/v1",router);


//Undefine route

app.use("*",(req,res)=>{
    res.status(404).json({"status":"Fail","data":"Not Found !"});
})


module.exports=app;