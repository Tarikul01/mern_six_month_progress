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
            const insert=await this.client.db().collection('student');
            const {insertedId}=await insert.insertOne(data);
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
                const delet=await this.client.db().collection('student');
                await delet.deleteOne({_id:id})
                await this.client.close();
    
            })();
            
            } catch (error) {
                console.log('Error: ', e.message);
                
            }

    }
    getData(){

    }
    updateData(){

    }
}

module.exports=db;