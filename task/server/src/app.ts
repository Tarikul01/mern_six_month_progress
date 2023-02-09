import express from 'express';
import mongoose from 'mongoose';
const app=express();
import db from "mongoose";
import FolderRoutes from "./routes/folder";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/folder",FolderRoutes);
app.use((err:Error,req:express.Request,res:express.Response,next:express.NextFunction)=>{
    res.status(200).json({"msg":err.message});
})
db.connect("mongodb://localhost:27017/folder",()=>{
    console.log("Db connected");
})
app.listen(5000,()=>{
    console.log("http://localhost:5000")
});