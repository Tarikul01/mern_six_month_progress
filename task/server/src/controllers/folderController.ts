import {RequestHandler} from "express";

import Folder,{FolderModel} from "../models/folderModel";
import Category,{categoryModel} from '../models/categoryModel';


export const createFolder:RequestHandler=async(req,res)=>{
    const data:FolderModel=req.body;
    console.log(data)
    const folder=await Folder.create(data);
    return res.status(200).json({"status":"success","data":folder});
}



export const categoryFolder:RequestHandler=async(req,res)=>{
    const category = new Category({name: req.body.name})
    try {
      let newCategory = await category.save();
      res.status(201).send({ response: `Category ${newCategory._id}` });
    } catch (err) {
      res.status(500).send(err);
    }
}