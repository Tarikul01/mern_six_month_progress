
const http=require('http');
const url=require('url');
const db=require('./db');
require("dotenv").config();
const database=new db(process.env.MONGO_URL);
database.conn();
// database.createDatabase('teacher');
// database.insertData({"Name":"Sayem","Roll":25})
// database.deleteData('632c6615ef9324b623442205');
// (async()=>{
//     const data= await database.getData();
//     console.log(data)
// })()
// database.getData()
// database.updateData('632c67721e061ade1601a95a',{"Name":"Sujan mridha","Roll":31});
// console.log(typeof(database.getData()))
// console.log(database.getData().constructor.name === 'AsyncFunction')

// database.getData()

http.createServer((req,res)=>{
    if(req.url==='/'){
        database.getData();
        res.end();
    }
    else if(req.url==='/update' && req.method==="POST"){
    //    database.updateData(url.parse(req.url, true).query.id,req.data)
    const data={"Name":"Sujan mridha","Roll":31}
    const id='632c67721e061ade1601a95a';
    database.updateData(id,data);
    res.end();
    }else if(req.url==='/delete'&& req.method==="POST"){
        // const id=url.parse(req.url, true).query.id
        const id='632c67721e061ade1601a95a';
       database.deleteData(id);
       res.end();
    }else if(req.url="/insert" && req.method==="POST"){

        // const data=req.body;
        const data={"Name":"Sayem","Roll":25};
        database.insertData(data);
        res.end();
    }

}).listen(4040);
console.log('👍Server running : http://localhost:4040/  ');