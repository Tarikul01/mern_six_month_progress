const mongoose=require("mongoose");
const app=require("./app");


//All third party middleware
require("dotenv").config();


//Database Connections 
mongoose.connect(process.env.MONGO_URL,()=>{
    try {
        
    console.log("MongodbConnection Succesfullly !");
    app.listen(process.env.PORT,()=>{
        console.log(`Server running https://localhost:${process.env.PORT}`);
    })
    } catch (error) {
        Console.log("Database Connection Fail!");  
    }
})


// const server=http.createServer(app);

// server.listen(process.env.PORT,()=>{
//     console.log("Successfull!");
// })



