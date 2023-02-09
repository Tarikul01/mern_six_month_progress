const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    ResourceTitle:{
      type:String,
    },
    ResourceDes:{
      type:String,
    },
    ResourceImg:{
      type:String,
    },
    SubjectName:{
      type:String
    },
    SemesterName:{
      type:String
    },
    Year:{
      type:String
    },

    CreatedDate: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

const ResourcesModel=mongoose.model("resource",DataSchema);
module.exports=ResourcesModel;
