const mongoose=require("mongoose");
const TodoSchema=mongoose.Schema({
    UserName:{type:String},
    TodoSubject:{type:String},
    TodoDescription:{type:String},
    TodoStatus:{type:String},
    TodoCreateDate:{type:Date},
    TodoUpdateDate:{type:Date}


},{verionKey:false});


const TodoListModel =mongoose.model("todo",TodoSchema);
module.exports=TodoListModel;