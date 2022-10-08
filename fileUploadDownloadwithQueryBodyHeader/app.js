const bodyParser = require('body-parser');
const express=require('express');
const app=express();
const dotenv=require("dotenv");
dotenv.config();

const router=require('./router/api');

app.use(bodyParser.json());

app.use("/api",router);

app.use("*",(req,res)=>{
    res.status(403).json({"msg":"Fail request!"})
});

module.exports=app;
