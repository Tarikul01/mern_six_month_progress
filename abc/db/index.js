const { ObjectId } = require('mongodb');

class db{

 constructor(URL){
    this.url=URL;
    }
    conn(){
        var MongoClient=require('mongodb').MongoClient;
        const client = new MongoClient(this.url);
        this.client=client;

    }
    createDatabase(dbName){
        (async ()=>{
            await this.client.connect();
            const abc=await this.client.db().createCollection(dbName);
            await this.client.close()

        })();
    }
    insertData(data){
        try {
            
        (async ()=>{
            await this.client.connect();
            const collection=await this.client.db().collection('student');
            await collection.insertOne(data);
            await this.client.close();

        })();
        
        } catch (error) {
            console.log('Error: ', e.message);
            
        }

    }
    deleteData(id){
        try {
            
            (async ()=>{
                await this.client.connect();
                const collection=await this.client.db().collection('student');
                await collection.deleteOne({"_id":ObjectId(id)})
                await this.client.close();
                // console.log(deletedId);
    
            })();
            
            } catch (error) {
                console.log('Error: ', e.message);
                
            }

    }
    async getData(){
        try {
           
            
           (async ()=>{
                await this.client.connect();
                const collection=await this.client.db().collection('student');
               const dataset=await collection.find().toArray();
            //    return dataset;
               console.log(dataset)
            //    return(JSON.stringify(dataset))
            //    return dataset
                await this.client.close();
                // console.log(deletedId);
    
            })();
            // return(JSON.stringify(data));
            // return data;
            
            } catch (error) {
                console.log('Error: ', e.message);
                
            }


    }
    updateData(id,data){
        try {
            
            (async ()=>{
                await this.client.connect();
                const collection=await this.client.db().collection('student');
                await collection.updateOne({"_id":ObjectId(id)},{$set:data});
                await this.client.close();
    
            })();
            // console.log(id,data)
            
            } catch (error) {
                console.log('Error: ', e.message);
                
            }

    }
}

module.exports=db;