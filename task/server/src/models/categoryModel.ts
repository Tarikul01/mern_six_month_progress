import mongoose, { Model } from "mongoose";



type categoryType=categoryModel & mongoose.Document

export interface categoryModel{
    name:{
        type:String,
    },
    slug:{type:String},
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
        ref:"Category"
    },
    ancestors:[{
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category",
            index:true,
        },
        name:String,
        slug:String,
    }]
}
const CategorySchema = new mongoose.Schema({
    name: String,
    slug: { type: String, index: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: 'Category'
    },
    ancestors: [{
         _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            index: true
    },
         name: String,
         slug: String
    }]
    });
    const Category:Model<categoryType>=mongoose.model<categoryType>("Category",CategorySchema);

export default Category;