import * as mongoose from "mongoose";
import { Model } from "mongoose";

type FolderType=FolderModel & mongoose.Document

export interface FolderModel{
    name:{
        type:String,
        require:true,
    }
}


const FolderSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    }
});

const Folder:Model<FolderType>=mongoose.model<FolderType>("Folder",FolderSchema);

export default Folder;